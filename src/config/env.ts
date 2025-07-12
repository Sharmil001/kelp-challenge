import dotenv from "dotenv";
dotenv.config();

export const config = {
	csvFilePath: process.env.CSV_FILE_PATH!,
	dbUrl: process.env.DATABASE_URL!,
	port: process.env.PORT || 3000,
};
