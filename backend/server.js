const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

app.use(
    cors({
        origin: "http://localhost:3000", // Update this to your frontend URL
        credentials: true,
    })
);
app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
