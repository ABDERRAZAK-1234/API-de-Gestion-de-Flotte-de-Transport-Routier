const maintenanceService = require("../services/maintenanceService");

const createMaintenance = async (req, res, next) => {
    try {
        const maintenance =
            await maintenanceService.createMaintenance(req.body);

        res.status(201).json({
            success: true,
            message: "Maintenance créée avec succès",
            data: maintenance
        });
    } catch (error) {
        next(error);
    }
};

const getAllMaintenances = async (req, res, next) => {
    try {
        const maintenances =
            await maintenanceService.getAllMaintenances();

        res.status(200).json({
            success: true,
            data: maintenances
        });
    } catch (error) {
        next(error);
    }
};

const getMaintenanceById = async (req, res, next) => {
    try {
        const maintenance =
            await maintenanceService.getMaintenanceById(
                req.params.id
            );

        if (!maintenance) {
            return res.status(404).json({
                success: false,
                message: "Maintenance introuvable"
            });
        }

        res.status(200).json({
            success: true,
            data: maintenance
        });
    } catch (error) {
        next(error);
    }
};

const updateMaintenance = async (req, res, next) => {
    try {
        const maintenance =
            await maintenanceService.updateMaintenance(
                req.params.id,
                req.body
            );

        if (!maintenance) {
            return res.status(404).json({
                success: false,
                message: "Maintenance introuvable"
            });
        }

        res.status(200).json({
            success: true,
            message: "Maintenance modifiée avec succès",
            data: maintenance
        });
    } catch (error) {
        next(error);
    }
};

const deleteMaintenance = async (req, res, next) => {
    try {
        const maintenance =
            await maintenanceService.deleteMaintenance(
                req.params.id
            );

        if (!maintenance) {
            return res.status(404).json({
                success: false,
                message: "Maintenance introuvable"
            });
        }

        res.status(200).json({
            success: true,
            message: "Maintenance supprimée avec succès"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createMaintenance,
    getAllMaintenances,
    getMaintenanceById,
    updateMaintenance,
    deleteMaintenance
};