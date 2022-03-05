import { Store } from "../entity";
import { Arg, Args, Int, Mutation, Query, Resolver } from "type-graphql";
import { getRepository } from "typeorm";
import { GraphQLError } from "graphql";
import { CreateStoreDto } from "./dto/store.dto";

@Resolver()
export class StoreResolver {
	private storeRepo = getRepository(Store);

	@Query(() => [Store])
	getAllStores(): Promise<Store[]> {
		return this.storeRepo.find();
	}

	@Query(() => Store, { nullable: true })
	async getStoreById(@Arg("id", () => Int) id: number) {
		const store = await this.storeRepo.findOne({ id });
		if (!store) {
			throw new GraphQLError(
				"Invalid store id",
				undefined,
				undefined,
				undefined,
				["getStoreById"],
				undefined,
				{ code: "INVALID_INPUT" }
			);
		}
		return store;
	}

	@Mutation(() => Store)
	async addStore(@Arg("store") store: CreateStoreDto) {
		const existingStore = await this.storeRepo.findOne({
			email: store.email,
		});
		if (existingStore) {
			throw new GraphQLError(
				`Store with email ${store.email} already exists`,
				undefined,
				undefined,
				undefined,
				["addStore"],
				undefined,
				{ code: "INVALID_INPUT" }
			);
		}
		const newStore = new Store();
		newStore.contact = store.contact;
		newStore.address = store.address;
		newStore.email = store.email;
		newStore.name = store.name;
		return await this.storeRepo.save(newStore);
	}
}
