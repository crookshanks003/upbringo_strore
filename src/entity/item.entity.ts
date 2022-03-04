import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Invoice } from "./invoice.entity";

@Entity()
export class Item {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	quantity: number;

	@Column()
	price_per_quant: number;

	@Column()
	discount: number;

	@Column()
	gst: number;

	@Column()
	amount: number;

	@ManyToOne(() => Invoice, invoice => invoice.items)
	invoice: Invoice;
}
