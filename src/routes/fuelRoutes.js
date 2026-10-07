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

const validate = require("../middlewares/validate");

const {
    createFuelSchema,
    updateFuelSchema
} = require("../validations/fuelValidation");

const router = express.Router();

router.use(authenticate);
router.use(authorize("ADMIN", "SUPER_ADMIN"));

router.post(
    "/",
    validate(createFuelSchema),
    createFuel
);

router.get("/", getAllFuels);

router.get("/:id", getFuelById);

router.put(
    "/:id",
    validate(updateFuelSchema),
    updateFuel
);

router.delete("/:id", deleteFuel);

module.exports = router;