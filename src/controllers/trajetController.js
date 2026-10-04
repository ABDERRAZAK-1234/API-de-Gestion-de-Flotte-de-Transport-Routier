const trajetService = require("../services/trajetService");

const createTrajet = async (req, res, next) => {
    try {
        const trajet = await trajetService.createTrajet(req.body);

        res.status(201).json({
            success: true,
            message: "Trajet créé avec succès",
            data: trajet
        });
    } catch (error) {
        next(error);
    }
};

const getAllTrajets = async (req, res, next) => {
    try {
        const trajets = await trajetService.getAllTrajets();

        res.status(200).json({
            success: true,
            data: trajets
        });
    } catch (error) {
        next(error);
    }
};

const getTrajetById = async (req, res, next) => {
    try {
        const trajet = await trajetService.getTrajetById(
            req.params.id
        );

        if (!trajet) {
            return res.status(404).json({
                success: false,
                message: "Trajet introuvable"
            });
        }

        res.status(200).json({
            success: true,
            data: trajet
        });
    } catch (error) {
        next(error);
    }
};

const updateTrajet = async (req, res, next) => {
    try {
        const trajet = await trajetService.updateTrajet(
            req.params.id,
            req.body
        );

        if (!trajet) {
            return res.status(404).json({
                success: false,
                message: "Trajet introuvable"
            });
        }

        res.status(200).json({
            success: true,
            message: "Trajet modifié avec succès",
            data: trajet
        });
    } catch (error) {
        next(error);
    }
};

const deleteTrajet = async (req, res, next) => {
    try {
        const trajet = await trajetService.deleteTrajet(
            req.params.id
        );

        if (!trajet) {
            return res.status(404).json({
                success: false,
                message: "Trajet introuvable"
            });
        }

        res.status(200).json({
            success: true,
            message: "Trajet supprimé avec succès"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createTrajet,
    getAllTrajets,
    getTrajetById,
    updateTrajet,
    deleteTrajet
};