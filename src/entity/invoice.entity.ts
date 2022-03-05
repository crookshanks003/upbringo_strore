import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {Field, ObjectType, registerEnumType} from "type-graphql";
import { Item } from "./item.entity";

export enum InvoiceStatus {
	PAID="paid",
	UNPAID="unpaid",
}
registerEnumType(InvoiceStatus, {name: "InvoiceStatus"});

@ObjectType()
@Entity()
export class Invoice {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	buyer_name: string;

	@Field()
	@Column()
	buyer_contact: string;

	@Field()
	@CreateDateColumn()
	created_at: Date;

	@Field(() => [Item])
	@OneToMany(() => Item, item => item.invoice)
	items: Item[];

	@Field()
	@Column()
	total_amount: number;

	@Field(() => InvoiceStatus)
	@Column({default: InvoiceStatus.UNPAID})
	status: InvoiceStatus;
}
