const express = require("express");

const {
  authenticate,
} = require("../../middlewares/authMiddleware");

const missionOrderController = require("../../controllers/missionOrderController");

const router = express.Router();

router.get(
  "/:id/mission-order-url",
  authenticate,
  missionOrderController.getMissionOrderUrl
);

module.exports = router;