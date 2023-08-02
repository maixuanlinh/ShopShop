const app = require("./app");
const connectDatabase = require("./db/Database");

// Handling uncaught exception
process.on("uncaughtException", (error) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server for handling uncaught exception`);
});

//config

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

// connect db 
connectDatabase();

//create server

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on https://localhost:${process.env.PORT}`);
});

// unhandled promise rejection
process.on("unhangledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`Shutting down the server for unhandled promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
