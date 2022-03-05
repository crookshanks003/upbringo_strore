import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Invoice } from "./invoice.entity";

@ObjectType()
@Entity()
export class Item {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	quantity: number;

	@Field()
	@Column()
	price_per_quant: number;

	@Field()
	@Column()
	discount: number;

	@Field()
	@Column()
	gst: number;

	@Field()
	@Column()
	amount: number;

	@Field(() => [Invoice])
	@ManyToOne(() => Invoice, invoice => invoice.items)
	invoice: Invoice;
}
