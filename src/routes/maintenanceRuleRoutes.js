const express = require("express");

const {
    createMaintenanceRule,
    getAllMaintenanceRules,
    getMaintenanceRuleById,
    updateMaintenanceRule,
    deleteMaintenanceRule
} = require("../controllers/maintenanceRuleController");

const {
    authenticate,
    authorize
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authenticate);
router.use(authorize("ADMIN", "SUPER_ADMIN"));

router.post("/", createMaintenanceRule);
router.get("/", getAllMaintenanceRules);
router.get("/:id", getMaintenanceRuleById);
router.put("/:id", updateMaintenanceRule);
router.delete("/:id", deleteMaintenanceRule);

module.exports = router;