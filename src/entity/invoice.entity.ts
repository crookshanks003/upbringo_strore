import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {Field, ObjectType} from "type-graphql";
import { Item } from "./item.entity";

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
}
