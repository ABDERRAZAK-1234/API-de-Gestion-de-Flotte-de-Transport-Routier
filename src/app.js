const express = require('express');
const authRoutes = require('./routes/authRoutes');
const camionRoutes = require("./routes/camionRoutes");
const remorqueRoutes = require("./routes/remorqueRoutes");
const trajetRoutes = require("./routes/trajetRoutes");
const pneuRoutes = require("./routes/pneuRoutes");
const maintenanceRoutes = require('./routes/maintenanceRoutes');
const fuelRoutes = require("./routes/fuelRoutes");
const maintenanceRuleRoutes = require("./routes/maintenanceRuleRoutes");
const userRoutes = require("./routes/userRoutes");
// v2
const v2Routes = require("./routes/v2");

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
app.use("/api/maintenances", maintenanceRoutes);

// fuels
app.use("/api/fuels", fuelRoutes);

// maintenaceRule
app.use("/api/maintenance-rules", maintenanceRuleRoutes);

// users
app.use("/api/users", userRoutes);


app.get("/healthz/liveness", (req, res) => {
    res.status(200).json({
        status: "ok"
    });
});


// v2
app.use(
    "/api/v2",
    (req, res, next) => {
        res.setHeader("X-API-Version", "2.0.0");
        res.setHeader("X-API-Deprecated", "false");
        next();
    },
    v2Routes
);

module.exports = app