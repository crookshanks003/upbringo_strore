import { createConnection } from "typeorm";
import { getConfig } from "./config";
import { Invoice, Item, Store } from "./entity";

async function main() {
	const config = getConfig();

	const connection = await createConnection({
		type: "mysql",
		host: config.DB_HOST,
		username: config.DB_USER,
		password: config.DB_PASSWORD,
		database: config.DB_NAME,
		entities: [Store, Item, Invoice],
	});

	console.log("Database connected");
}

main();
