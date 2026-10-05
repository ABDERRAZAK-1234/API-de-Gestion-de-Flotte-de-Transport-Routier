const express = require('express');
const authRoutes = require('./routes/authRoutes');
const camionRoutes = require("./routes/camionRoutes");
const remorqueRoutes = require("./routes/remorqueRoutes");
const trajetRoutes = require("./routes/trajetRoutes");
const pneuRoutes = require("./routes/pneuRoutes");
const maintenanceRoutes = require('./routes/maintenanceRoutes');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Fleet Managment API is running"
    });
});

// auth
app.use("/api/auth", authRoutes);

// camions
app.use("/api/camions", camionRoutes);

// remourque
app.use("/api/remorques", remorqueRoutes);

// trajets
app.use("/api/trajets", trajetRoutes);

// pneus
app.use("/api/pneus", pneuRoutes);

// maintenaces
app.use("/api/maintenaces", maintenanceRoutes);


module.exports = app