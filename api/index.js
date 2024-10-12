import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.routes.js";
import slackRoutes from "./routes/slack.routes.js"
import cookieParser from "cookie-parser";
dotenv.config();
connectToDB();
const app = express();

app.use(express.json());
app.use(cookieParser());


//routes

app.use("/api/auth", authRoutes);
app.use("/api/slack", slackRoutes); 

app.listen(3000, () => {
  console.log("server running on port 3000!");
});