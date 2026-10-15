
const express = require("express");

const {
    authenticate,
    authorize
} = require("../../middlewares/authMiddleware");

const analyticsController = require("../../controllers/analyticsController");

const router = express.Router();

router.get(
    "/drivers/eco-performance",
    authenticate,
    authorize("ADMIN", "SUPER_ADMIN"),
    analyticsController.getDriversEcoPerformance
);

module.exports = router;
