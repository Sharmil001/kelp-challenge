import { parseCSV } from "../utils/csvParser";
import { insertUserInBatch, pool } from "../db";

export async function uploadCSVData() {
	const users = await parseCSV();
	console.log("Parsing CSV file successful...!");
	await insertUserInBatch(users, 500);
	console.log("Data uploaded to database successfully...!");
}

export async function printAgeDistribution() {
	const res = await pool.query("SELECT age FROM users");
	const total = res.rows.length;
	const buckets = { "<20": 0, "20-40": 0, "40-60": 0, ">60": 0 };
	for (const { age } of res.rows) {
		if (age < 20) buckets["<20"]++;
		else if (age <= 40) buckets["20-40"]++;
		else if (age <= 60) buckets["40-60"]++;
		else buckets[">60"]++;
	}
	const tableData = Object.entries(buckets).map(([range, count]) => ({
		"Age Group": range,
		"Distribution (%)": `${Math.round((count / total) * 100)}%`,
	}));
	console.log("\nAge-Group Distribution:\n");
	console.table(tableData);
}
