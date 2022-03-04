import * as dotenv from "dotenv";

dotenv.config();

export function getConfig() {
	if (
		!process.env.DB_USER ||
		!process.env.DB_HOST ||
		!process.env.DB_PASSWORD ||
		!process.env.DB_NAME
	) {
		throw new Error("Config is either missing or incomplete");
	}
	return {
		DB_USER: process.env.DB_USER,
		DB_PASSWORD: process.env.DB_PASSWORD,
		DB_HOST: process.env.DB_HOST,
		DB_NAME: process.env.DB_NAME,
	};
}
