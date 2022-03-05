import { createConnection } from "typeorm";
import { getConfig } from "./config";
import express from "express";
import cors from "cors";
import { Invoice, Item, Store } from "./entity";
import { graphqlHTTP } from "express-graphql";
import { ArgumentValidationError, buildSchema } from "type-graphql";
import { resolvers } from "./resolver";

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
				resolvers,
			}),
			customFormatErrorFn: (err) => {
				let extensions;
				if (err.originalError instanceof ArgumentValidationError) {
					extensions = {
						...(err.originalError as Object),
						code: "INVALID_INPUT",
					};
				} else if (err.extensions) {
					extensions = err.extensions;
				}
				return { message: err.message, path: err.path, extensions };
			},
			graphiql: true,
		})
	);

	app.listen(config.PORT, () => {
		console.log(`visit http://localhost:${config.PORT}/graphql`);
	});
}

main();
