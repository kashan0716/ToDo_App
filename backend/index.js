import express from "express";
import cors from "cors";
import "dotenv/config";
import { taskRouter } from "./routes/task.route.js";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 3000;

// middleware

app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    const done = await mongoose.connect(process.env.MONGO_URL);
    if (done) {
      console.log("mongoDB connected");
    }
  } catch (error) {
    console.log("mongoDB not Connected");
    console.log(error);
  }
};

connectDB();

app.get("/api", (req, res) => {
  return res.json({
    message: "hello",
    name: "kashan",
    class: "MERN",
  });
});

app.get("/api/data", (req, res) => {
  return res.json({
    task: "reading",
    complete: false,
    date: new Date(),
  });
});

app.use("/api/task", taskRouter);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
