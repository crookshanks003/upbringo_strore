import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "./item.entity";

@Entity()
export class Invoice {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	buyer_name: string;

	@Column()
	buyer_contact: string;

	@CreateDateColumn()
	created_at: Date;

	@OneToMany(() => Item, item => item.invoice)
	items: Item[];

	@Column()
	total_amount: number;
}
