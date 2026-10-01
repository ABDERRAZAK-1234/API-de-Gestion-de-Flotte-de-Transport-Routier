const express = require('express');
const authRoutes = require('./routes/authRoutes');
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

module.exports = app