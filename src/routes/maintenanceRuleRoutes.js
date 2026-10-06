const express = require("express");

const {
    createMaintenanceRule,
    getAllMaintenanceRules,
    getMaintenanceRuleById,
    updateMaintenanceRule,
    deleteMaintenanceRule
} = require("../controllers/maintenanceRuleController");

const router = express.Router();

router.post("/", createMaintenanceRule);

router.get("/", getAllMaintenanceRules);

router.get("/:id", getMaintenanceRuleById);

router.put("/:id", updateMaintenanceRule);

router.delete("/:id", deleteMaintenanceRule);

module.exports = router;