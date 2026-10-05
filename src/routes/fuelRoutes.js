const express = require("express");

const {
    createFuel,
    getAllFuels,
    getFuelById,
    updateFuel,
    deleteFuel
} = require("../controllers/fuelController");

const router = express.Router();

router.post("/", createFuel);
router.get("/", getAllFuels);
router.get("/:id", getFuelById);
router.put("/:id", updateFuel);
router.delete("/:id", deleteFuel);

module.exports = router;