import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// routers import
import userRouter from "./routes/user.js";

// swager import
import swaggerSetup from "./utils/swagger.js";

// Configs
const app = express();
const port = 5000;

dotenv.config();

app.use(cors());

app.use(express.json());
swaggerSetup(app);

// api links
app.get("/", (req, res, next) => {
  res.send("<h1>Hello, this is JP_NoteBook!</h1>");
});

app.use("/api/users", userRouter);
///////////////////////////////////////////////////////////////////////

// mongodb
const mongodb_url = process.env.MONGO_URL;

const connectMongoDB = async () => {
  try {
    await mongoose.connect(mongodb_url);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

// server
app.listen(port, async () => {
  console.log(`App Connected to Back-end on port: ${port} 
    http://localhost:${port}/`);
  try {
    await connectMongoDB();
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
});
