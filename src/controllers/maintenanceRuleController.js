const maintenanceRuleService = require("../services/maintenanceRuleService");

const createMaintenanceRule = async (req, res, next) => {
    try {
        const maintenanceRule =
            await maintenanceRuleService.createMaintenanceRule(req.body);

        res.status(201).json({
            success: true,
            message: "Maintenance rule créée avec succès",
            data: maintenanceRule
        });
    } catch (error) {
        next(error);
    }
};

const getAllMaintenanceRules = async (req, res, next) => {
    try {
        const maintenanceRules =
            await maintenanceRuleService.getAllMaintenanceRules();

        res.status(200).json({
            success: true,
            data: maintenanceRules
        });
    } catch (error) {
        next(error);
    }
};

const getMaintenanceRuleById = async (req, res, next) => {
    try {
        const maintenanceRule =
            await maintenanceRuleService.getMaintenanceRuleById(req.params.id);

        if (!maintenanceRule) {
            return res.status(404).json({
                success: false,
                message: "Maintenance rule introuvable"
            });
        }

        res.status(200).json({
            success: true,
            data: maintenanceRule
        });
    } catch (error) {
        next(error);
    }
};

const updateMaintenanceRule = async (req, res, next) => {
    try {
        const maintenanceRule =
            await maintenanceRuleService.updateMaintenanceRule(
                req.params.id,
                req.body
            );

        if (!maintenanceRule) {
            return res.status(404).json({
                success: false,
                message: "Maintenance rule introuvable"
            });
        }

        res.status(200).json({
            success: true,
            message: "Maintenance rule modifiée avec succès",
            data: maintenanceRule
        });
    } catch (error) {
        next(error);
    }
};

const deleteMaintenanceRule = async (req, res, next) => {
    try {
        const maintenanceRule =
            await maintenanceRuleService.deleteMaintenanceRule(req.params.id);

        if (!maintenanceRule) {
            return res.status(404).json({
                success: false,
                message: "Maintenance rule introuvable"
            });
        }

        res.status(200).json({
            success: true,
            message: "Maintenance rule supprimée avec succès"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createMaintenanceRule,
    getAllMaintenanceRules,
    getMaintenanceRuleById,
    updateMaintenanceRule,
    deleteMaintenanceRule
};