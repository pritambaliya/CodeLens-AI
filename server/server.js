import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import reviewRoutes from "./routes/review.route.js";
import issueRoutes from "./routes/issue.route.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import reviewHistoryRoutes from "./routes/reviewHistory.routes.js";
import favoriteRoutes from "./routes/favorite.routes.js";
import chatbot from "./routes/chat.route.js";
import session from "express-session";
import passport from "./config/passport.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin:"https://codelens-ai-2v7l.onrender.com",
    credentials:true
  })
);

app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());

app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/reviews", reviewRoutes);
app.use("/issues", issueRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/history", reviewHistoryRoutes);
app.use("/favorites", favoriteRoutes);
app.use("/chatbot", chatbot);


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