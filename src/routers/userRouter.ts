import { Router } from "express";
import { handleUpload } from "../controllers/userController";

const userRouter = Router();

userRouter.post("/upload", handleUpload);

export default userRouter;
