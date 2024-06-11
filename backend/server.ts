import path from "path";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import UserController from "./controllers/user.controller";

// Import global environment variables instead of using .env file for each folder
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const app = express();

// Middleware to manage body requests
app.use(express.json());

// Declaring environment variables
const PORT = process.env.BACKEND_PORT ?? 3000;
const MONGOURL = process.env.MONGODB_URL ?? "";

// Enable cors
app.use(cors());

// ------------ Users ------------ \\

// POST
app.post("/users", UserController.create);
app.post("/auth", UserController.authenticateUser)

// GET
app.get("/users", UserController.getAll);
app.get("/users/:id", UserController.getById);

// UPDATE
app.put("/users/:id", UserController.update)

// DELETE
app.delete("/users/:id", UserController.delete)

// MongoDB connection
mongoose
  .connect(MONGOURL)
  .then(() =>
    // Once the database is connected, Server listening on PORT provided
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    })
  )
  .catch((err) => console.error("Connection to database failed: ", err));
