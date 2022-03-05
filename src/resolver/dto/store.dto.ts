import { IsEmail, IsNumberString, Length } from "class-validator";
import { Store } from "../../entity";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateStoreDto implements Partial<Store> {
	@Field()
	name: string;

	@Field()
	address: string;

	@Field()
	@IsNumberString()
	@Length(10, 10)
	contact: string;

	@Field()
	@IsEmail()
	email: string;
}
