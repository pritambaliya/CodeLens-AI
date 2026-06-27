import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin:"http://localhost:5173",
    credentials:true
  })
);

app.use("/user", userRoutes);
app.use("/auth", authRoutes);


app.get('/',(req,res)=>{
    res.send("Server Running..")
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");
    app.listen(5000, () => {
      console.log(`Server running on port 5000`);
    });
  })
  .catch((err) => {
    console.error(
      "DB Connection Error:",
      err
    );
  });