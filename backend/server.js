const express = require("express");
const cors = require("cors");
const sequelize = require('./config/db');
const app = express();
const authRoutes = require("./routes/authRoutes");
const itemRoutes = require('./routes/itemRoutes');
const blindboxRoutes = require('./routes/blindboxRoutes');
// const gachaRoutes = require('./routes/gachaRoutes');
//const purchaseRoutes = require('./routes/purchaseRoutes');

require("dotenv").config();

// Import models and associations
require('./models');

app.use(
    cors({
        origin: "http://localhost:3000", // Update this to your frontend URL
        credentials: true,
    })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/blindboxes', blindboxRoutes);
// app.use('/api/gachas', gachaRoutes);
//app.use('/api/purchase', purchaseRoutes);

const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
  console.log('Database & tables created!');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });