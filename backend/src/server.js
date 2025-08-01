import expresss from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRoutes from "../src/routes/notesRoutes.js";
import connectDB from "../src/db/db.js";
import rateLimiter from "../src/middleware/rateLimiter.js";

dotenv.config();
const app = expresss(); // Create an Express application
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(expresss.json()); // Middleware to parse JSON bodies

app.use(rateLimiter); // Apply rate limiting middleware to all routes

app.use("/api/notes", notesRoutes); // Use notes routes for all requests to /api/notes

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
