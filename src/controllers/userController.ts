import { Request, Response } from "express";
import { uploadCSVData, printAgeDistribution } from "../services/userService";

export async function handleUpload(req: Request, res: Response) {
	try {
		await uploadCSVData();
	} catch (err) {
		console.error("Error uploading CSV:", err);
		return res
			.status(500)
			.json({ error: "Failed to upload CSV data to database." });
	}

	try {
		await printAgeDistribution();
	} catch (err) {
		console.error("Error calculating distribution:", err);
		return res.status(500).json({
			error: "Data uploaded, but failed to calculate age distribution.",
		});
	}

	res.status(200).json({ message: "Converted CSV to JSON successfully...!" });
}
