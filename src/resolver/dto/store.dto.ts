import { IsEmail, IsNumberString, IsString, Length } from "class-validator";
import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class CreateStoreDto {
	@Field()
	@IsString()
	name: string;

	@Field()
	@IsString()
	address: string;

	@Field()
	@IsNumberString()
	@Length(10, 10)
	contact: string;

	@Field()
	@IsEmail()
	email: string;
}
