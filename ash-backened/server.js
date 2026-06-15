const express = require("express");
const cors = require("cors");
const app = express();

const authRoutes = require("./routes/authRoutes");

// Middleware
app.use(cors());

app.use(express.json());

// Routes
app.use("/api", authRoutes);

// Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});