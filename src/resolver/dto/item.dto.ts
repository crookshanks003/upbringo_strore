import { Item } from "../../entity";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateItemDto implements Partial<Item> {
	@Field()
	name: string;

	@Field()
	quantity: number;

	@Field()
	price_per_quant: number;

	//excluding gst
	@Field()
	discount: number;

	@Field()
	gst: number;
}
