import express from "express";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

//database connection
connectDB();

const app = express();

app.use(express.json());

//routes
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

//custom error middleware
app.use(notFound);
app.use(errorHandler);

//connection
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
