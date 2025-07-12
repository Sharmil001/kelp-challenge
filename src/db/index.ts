import { Pool } from "pg";
import { config } from "../config/env";

export const pool = new Pool({ connectionString: config.dbUrl });

export async function initDb() {
	const query = `
	CREATE TABLE IF NOT EXISTS users (
		id SERIAL PRIMARY KEY,
		name VARCHAR NOT NULL,
		age INT NOT NULL,
		address JSONB,
		additional_info JSONB
	)`;

	try {
		await pool.query(query);
		console.log("Database conncted successfully...!");
	} catch (err) {
		console.error("Error while creating database:", err);
	}
}

export async function insertUserInBatch(user: any, batchSize: number) {
	let totalInserted = 0;

	for (let i = 0; i < user.length; i += batchSize) {
		const batch = user.slice(i, i + batchSize);
		const values: any[] = [];
		const placeholders: string[] = [];

		batch.forEach((user: any, index: number) => {
			const idx = index * 4;
			placeholders.push(`($${idx + 1}, $${idx + 2}, $${idx + 3}, $${idx + 4})`);
			values.push(
				user.name,
				user.age,
				JSON.stringify(user.address || {}),
				JSON.stringify(user.additional_info || {}),
			);
		});

		const query = `
			INSERT INTO users (name, age, address, additional_info)
			VALUES ${placeholders.join(", ")}
		`;

		totalInserted += batch.length;
		await pool.query(query, values);

		console.log(
			`Inserted ${batch.length} users. Total so far: ${totalInserted}/${user.length}`,
		);
	}
}

export async function insertUser(user: any) {
	const query = `
    INSERT INTO users (name, age, address, additional_info)
    VALUES ($1, $2, $3, $4)
  `;
	const values = [
		user.name,
		user.age,
		JSON.stringify(user.address),
		JSON.stringify(user.additional_info),
	];
	await pool.query(query, values);
}
