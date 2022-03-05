import { Invoice, InvoiceStatus, Item } from "../entity";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { getRepository } from "typeorm";
import { CreateInvoiceDto } from "./dto/invoice.dto";
import { GraphQLError } from "graphql";

Resolver();
export class InvoiceResolver {
	private invoiceRepo = getRepository(Invoice);
	private itemsRepo = getRepository(Item);

	@Query(() => Invoice)
	async getInvoiceById(@Arg("id") id: number): Promise<Invoice> {
		const invoice = await this.invoiceRepo
			.createQueryBuilder("invoice")
			.innerJoinAndSelect("invoice.items", "item")
			.where("invoice.id = :id", { id })
			.getOne();

		if (!invoice) {
			throw new GraphQLError(
				"Invalid invoice id",
				undefined,
				undefined,
				undefined,
				["getInvoiceById"],
				undefined,
				{ code: "INVALID_INPUT" }
			);
		}
		return invoice;
	}

	@Mutation(() => Invoice)
	async addInvoice(
		@Arg("invoice") invoice: CreateInvoiceDto
	): Promise<Invoice> {
		let totalAmount = 0;

		const items = invoice.items.map((item) => {
			const newItem = new Item();
			newItem.quantity = item.quantity;
			newItem.name = item.name;
			newItem.price_per_quant = item.price_per_quant;
			newItem.discount = item.discount;
			newItem.gst = item.gst;
			newItem.amount = this.calculateItemAmount(
				item.price_per_quant,
				item.gst,
				item.discount
			);
			totalAmount += newItem.amount * newItem.quantity;

			return newItem;
		});
		await this.itemsRepo.save(items);

		const newInvoice = new Invoice();
		newInvoice.buyer_name = invoice.buyer_name;
		newInvoice.buyer_contact = invoice.buyer_contact;
		newInvoice.items = items;
		newInvoice.total_amount = totalAmount;
		return await this.invoiceRepo.save(newInvoice);
	}

	@Mutation(() => Invoice)
	async changeInvoiceStatus(@Arg("invoiceId", () => Int) id: number, @Arg("status", () => InvoiceStatus) status: InvoiceStatus) {
		const invoice = await this.invoiceRepo
			.createQueryBuilder("invoice")
			.innerJoinAndSelect("invoice.items", "item")
			.where("invoice.id = :id", { id })
			.getOne();

		if(!invoice) {
			throw new GraphQLError(
				"Invalid invoice id",
				undefined,
				undefined,
				undefined,
				["changeInvoiceStatus"],
				undefined,
				{ code: "INVALID_INPUT" }
			);
		}
		invoice.status = status;
		await this.invoiceRepo.save(invoice);
		return invoice;
	}

	private calculateItemAmount(price: number, gst: number, discount: number) {
		return price - (price * discount) / 100 + (price * gst) / 100;
	}
}
