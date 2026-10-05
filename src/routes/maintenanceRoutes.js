const express = require("express");

const {
    createMaintenance,
    getAllMaintenances,
    getMaintenanceById,
    updateMaintenance,
    deleteMaintenance
} = require("../controllers/maintenanceController");

const router = express.Router();

router.post("/", createMaintenance);
router.get("/", getAllMaintenances);
router.get("/:id", getMaintenanceById);
router.put("/:id", updateMaintenance);
router.delete("/:id", deleteMaintenance);

module.exports = router;