const express = require("express");

const {
    createFuel,
    getAllFuels,
    getFuelById,
    updateFuel,
    deleteFuel
} = require("../controllers/fuelController");

const {
    authenticate,
    authorize
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authenticate);
router.use(authorize("ADMIN", "SUPER_ADMIN"));

router.post("/", createFuel);
router.get("/", getAllFuels);
router.get("/:id", getFuelById);
router.put("/:id", updateFuel);
router.delete("/:id", deleteFuel);

module.exports = router;