const express = require("express");

const {
    createMaintenance,
    getAllMaintenances,
    getMaintenanceById,
    updateMaintenance,
    deleteMaintenance
} = require("../controllers/maintenanceController");

const {
    authenticate,
    authorize
} = require("../middlewares/authMiddleware");

const validate = require("../middlewares/validate");

const {
    createMaintenanceSchema,
    updateMaintenanceSchema
} = require("../validations/maintenanceValidation");

const router = express.Router();

router.use(authenticate);
router.use(authorize("ADMIN", "SUPER_ADMIN"));

router.post(
    "/",
    validate(createMaintenanceSchema),
    createMaintenance
);

router.get("/", getAllMaintenances);

router.get("/:id", getMaintenanceById);

router.put(
    "/:id",
    validate(updateMaintenanceSchema),
    updateMaintenance
);

router.delete("/:id", deleteMaintenance);

module.exports = router;