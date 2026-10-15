
const express = require("express");

const router = express.Router();

const analyticsRoutes = require("./analyticsRoutes");

router.use("/analytics", analyticsRoutes);

module.exports = router;