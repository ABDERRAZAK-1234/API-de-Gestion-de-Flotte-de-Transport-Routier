
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

router.get(
    "/tires/health-matrix",
    authenticate,
    authorize("ADMIN", "SUPER_ADMIN"),
    analyticsController.getTiresHealthMatrix
);

router.get(
    "/trips/financial-esg",
    authenticate,
    authorize("ADMIN", "SUPER_ADMIN"),
    analyticsController.getTripsFinancialEsg
);

router.get(
    "/fleet/utilization-trends",
    authenticate,
    authorize("ADMIN", "SUPER_ADMIN"),
    analyticsController.getFleetUtilizationTrends
);

module.exports = router;
