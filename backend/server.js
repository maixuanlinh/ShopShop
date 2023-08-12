const app = require("./app");
const connectDatabase = require("./db/Database");

// Handling uncaught exception
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err); // Changed logging
  console.error("Shutting down the server due to Uncaught Exception.");
  process.exit(1);
});

// Load environment variables
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

// Connect to the database
connectDatabase();

// Create server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err); // Changed logging
  console.error("Shutting down the server due to Unhandled Promise Rejection.");

  // Graceful shutdown
  server.close(() => {
    process.exit(1);
  });
});
