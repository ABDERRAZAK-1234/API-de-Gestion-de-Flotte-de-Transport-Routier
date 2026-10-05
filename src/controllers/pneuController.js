const pneuService = require("../services/pneuService");

const createPneu = async (req, res, next) => {
    try {
        const pneu = await pneuService.createPneu(req.body);

        res.status(201).json({
            success: true,
            message: "Pneu créé avec succès",
            data: pneu
        });
    } catch (error) {
        next(error);
    }
};

const getAllPneus = async (req, res, next) => {
    try {
        const pneus = await pneuService.getAllPneus();

        res.status(200).json({
            success: true,
            data: pneus
        });
    } catch (error) {
        next(error);
    }
};

const getPneuById = async (req, res, next) => {
    try {
        const pneu = await pneuService.getPneuById(
            req.params.id
        );

        if (!pneu) {
            return res.status(404).json({
                success: false,
                message: "Pneu introuvable"
            });
        }

        res.status(200).json({
            success: true,
            data: pneu
        });
    } catch (error) {
        next(error);
    }
};

const updatePneu = async (req, res, next) => {
    try {
        const pneu = await pneuService.updatePneu(
            req.params.id,
            req.body
        );

        if (!pneu) {
            return res.status(404).json({
                success: false,
                message: "Pneu introuvable"
            });
        }

        res.status(200).json({
            success: true,
            message: "Pneu modifié avec succès",
            data: pneu
        });
    } catch (error) {
        next(error);
    }
};

const deletePneu = async (req, res, next) => {
    try {
        const pneu = await pneuService.deletePneu(
            req.params.id
        );

        if (!pneu) {
            return res.status(404).json({
                success: false,
                message: "Pneu introuvable"
            });
        }

        res.status(200).json({
            success: true,
            message: "Pneu supprimé avec succès"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createPneu,
    getAllPneus,
    getPneuById,
    updatePneu,
    deletePneu
};