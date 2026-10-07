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

const validate = require("../middlewares/validate");

const {
    createMaintenanceRuleSchema,
    updateMaintenanceRuleSchema
} = require("../validations/maintenanceRuleValidation");

const router = express.Router();

router.use(authenticate);
router.use(authorize("ADMIN", "SUPER_ADMIN"));

router.post(
    "/",
    validate(createMaintenanceRuleSchema),
    createMaintenanceRule
);

router.get("/", getAllMaintenanceRules);

router.get("/:id", getMaintenanceRuleById);

router.put(
    "/:id",
    validate(updateMaintenanceRuleSchema),
    updateMaintenanceRule
);

router.delete("/:id", deleteMaintenanceRule);

module.exports = router;