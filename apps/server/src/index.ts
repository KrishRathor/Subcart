import express from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes";
import { clerkMiddleware } from "@clerk/express";
import { storeRouter } from "./routes/storeRoutes";
import { type Request, type Response } from "express";

const app = express();
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

app.use("/api/users", userRouter);
app.use("/api/store", storeRouter);

app.listen(5000, () => {
  console.log(`Server listening on port 5000`)
})
