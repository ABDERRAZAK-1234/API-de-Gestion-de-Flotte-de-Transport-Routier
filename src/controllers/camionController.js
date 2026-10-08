const camionService = require("../services/camionService");

const createCamion = async (req, res, next) => {
    try {
        const camion = await camionService.createCamion(req.body);

        res.status(201).json({
            success: true,
            message: "Camion créé avec succès",
            data: camion
        });
    } catch (error) {
        next(error);
    }
};

const getAllCamions = async (req, res, next) => {
    try {
        const camions = await camionService.getAllCamions();

        res.status(200).json({
            success: true,
            data: camions
        });
    } catch (error) {
        next(error);
    }
};

const getCamionById = async (req, res, next) => {
    try {
        const camion = await camionService.getCamionById(
            req.params.id
        );

        if (!camion) {
            return res.status(404).json({
                success: false,
                message: "Camion introuvable"
            });
        }

        res.status(200).json({
            success: true,
            data: camion
        });
    } catch (error) {
        next(error);
    }
};

const updateCamion = async (req, res, next) => {
    try {
        const camion = await camionService.updateCamion(
            req.params.id,
            req.body
        );

        if (!camion) {
            return res.status(404).json({
                success: false,
                message: "Camion introuvable"
            });
        }

        res.status(200).json({
            success: true,
            message: "Camion modifié avec succès",
            data: camion
        });
    } catch (error) {
        next(error);
    }
};

const deleteCamion = async (req, res, next) => {
    try {
        const camion =
            await camionService.deleteCamion(req.params.id);

        res.status(200).json({
            success: true,
            message: "Camion archivé avec succès",
            data: camion
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createCamion,
    getAllCamions,
    getCamionById,
    updateCamion,
    deleteCamion
};