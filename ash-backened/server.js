require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();


const { sequelize, connectDB } = require("./config/db");
//console.log(require.resolve("./config/db"));
const authRoutes = require("./routes/authRoutes");

//const db = require("./config/db");
//console.log("DB Object:", db);
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", authRoutes);

const PORT = process.env.PORT || 5000;

// Connect Database and Start Server
connectDB()
  .then(async () => {
    await sequelize.sync();

    console.log("Tables synchronized");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Server Startup Error:", err);
  });