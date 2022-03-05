import { IsNumberString, Length } from "class-validator";
import { Field, InputType } from "type-graphql";
import { CreateItemDto } from "./item.dto";

@InputType()
export class CreateInvoiceDto {
	@Field()
	buyer_name: string;

	@Field()
	@IsNumberString()
	@Length(10,10)
	buyer_contact: string;

	@Field(() => [CreateItemDto])
	items: CreateItemDto[];
}
