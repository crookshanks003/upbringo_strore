import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Store {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	address: string;

	@Column()
	contact: string;

	@Column()
	email: string;
}
