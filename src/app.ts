import express from "express";
import { config } from "./config/env";
import userRouter from "./routers/userRouter";
import { initDb } from "./db";

const app = express();
app.use(express.json());

app.use("/api", userRouter);

async function startServer() {
	try {
		await initDb();
		app.listen(config.port, () => {
			console.log(`🚀 Server started on port ${config.port}`);
		});
	} catch (err) {
		console.error("Failed to start server:", err);
		process.exit(1);
	}
}

startServer();
