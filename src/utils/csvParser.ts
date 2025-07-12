import fs from "fs";
import path from "path";
import { config } from "../config/env";

function setDeep(obj: any, keys: string[], value: any) {
	let temp = obj;
	while (keys.length > 1) {
		const key = keys.shift()!;
		temp[key] = temp[key] || {};
		temp = temp[key];
	}
	temp[keys[0]] = value;
}

export async function parseCSV(): Promise<any[]> {
	const filePath = path.resolve(config.csvFilePath);
	const content = fs.readFileSync(filePath, "utf-8");
	const lines = content.trim().split("\n");
	const headers = lines[0]
		.split(",")
		.map((h) => h.trim().replace(/^"|"$/g, ""));

	const result: any[] = [];

	for (let i = 1; i < lines.length; i++) {
		const values = lines[i].split(",").map((v) => {
			const cleaned = v.trim().replace(/^"|"$/g, "");
			return isNaN(Number(cleaned)) ? cleaned : Number(cleaned);
		});
		const user: any = { additional_info: {} };

		for (let j = 0; j < headers.length; j++) {
			const header = headers[j];
			const value = isNaN(Number(values[j])) ? values[j] : Number(values[j]);

			if (
				header.startsWith("name") ||
				header === "age" ||
				header.startsWith("address")
			) {
				setDeep(user, header.split("."), value);
			} else {
				setDeep(user.additional_info, header.split("."), value);
			}
		}

		user.name = `${user.name.firstName} ${user.name.lastName}`;
		result.push(user);
	}

	return result;
}
