import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// routers import
import userRouter from "./routes/user.js";
import notebookRouter from "./routes/notebook.js";
import pageRouter from "./routes/page.js";

// swager import
import swaggerSetup from "./utils/swagger.js";

// Configs
const app = express();
const port = 5000;

dotenv.config();
app.use(express.json());

app.use(cors());

swaggerSetup(app);

/////////    api paths    /////////////////////////////////////////////
app.get("/", (req, res, next) => {
  res.send("<h1>Hello, this is JP_NoteBook!</h1>");
});

app.use("/api/users", userRouter);
app.use("/api/notebooks", notebookRouter);
app.use("/api/pages", pageRouter);
///////////////////////////////////////////////////////////////////////

// handle response
app.use((obj, req, res, next) => {
  const statusCode = obj.status || 500;
  const message = obj.message || "Something went wrong!";
  return res.status(statusCode).json({
    success: [200, 201, 204].includes(obj.status),
    status: statusCode,
    message: message,
    data: obj.data,
  });
});

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
  console.log(`
App Connected to Back-end on port: ${port} 

  http://localhost:${port}/
  http://localhost:${port}/api-docs/
   `);
  try {
    await connectMongoDB();
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
});
