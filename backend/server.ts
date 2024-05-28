import path from "path";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// Import global environment variables instead of using .env file for each folder
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const app = express();

// Manage body requests
app.use(express.json());

// Declaring environment variables
const PORT = process.env.BACKEND_PORT ?? 3000;
const MONGOURL = process.env.MONGODB_URL ?? "";

// Enable cors
app.use(cors());

// MongoDB connection
mongoose
  .connect(MONGOURL)
  .then(() =>
    // Message for PORT listening in server
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    })
  )
  .catch((err) => console.error("Connection to database failed: ", err));
  