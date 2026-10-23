const express = require("express");

const router = express.Router();

const analyticsRoutes = require("./analyticsRoutes");
const tripsRoutes = require("./tripsRoutes");

router.use("/analytics", analyticsRoutes);
router.use("/trips", tripsRoutes);

module.exports = router;
