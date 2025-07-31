const expresss = require("express");
const notesRoutes = require("./routes/notesRoutes");
const connectDB = require("./db/db");
require("dotenv").config(); // Load environment variables from .env file

const app = expresss(); // Create an Express application

connectDB(); // Connect to the database

app.use(expresss.json()); // Middleware to parse JSON bodies
app.use("/api/notes", notesRoutes); // Use notes routes for all requests to /api/notes

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
