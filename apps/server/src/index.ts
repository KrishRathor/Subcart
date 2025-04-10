import express from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/users", userRouter);

app.listen(5000, () => {
  console.log(`Server listening on port 5000`)
})
