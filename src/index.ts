import { createConnection } from "typeorm";
import { getConfig } from "./config";
import express from "express";
import cors from "cors";
import { Invoice, Item, Store } from "./entity";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolver/hello.resolver";

async function main() {
	const config = getConfig();

	await createConnection({
		type: "mysql",
		host: config.DB_HOST,
		username: config.DB_USER,
		password: config.DB_PASSWORD,
		database: config.DB_NAME,
		entities: [Store, Item, Invoice],
	});

	console.log("Database connected");

	const app = express();

	app.use(cors());

	app.use(
		"/graphql",
		graphqlHTTP({
			schema: await buildSchema({
				resolvers: [HelloResolver],
			}),
			graphiql: true,
		})
	);

	app.listen(5000, () => {
		console.log("listening at http://localhost:5000");
	});
}

main();
