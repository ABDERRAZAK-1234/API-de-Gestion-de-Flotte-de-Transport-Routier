const remorqueService = require("../services/remorqueService");

const createRemorque = async (req, res, next) => {
    try {
        const remorque = await remorqueService.createRemorque(req.body);

        res.status(201).json({
            success: true,
            message: "Remorque créée avec succès",
            data: remorque
        });
    } catch (error) {
        next(error);
    }
};

const getAllRemorques = async (req, res, next) => {
    try {
        const remorques = await remorqueService.getAllRemorques();

        res.status(200).json({
            success: true,
            data: remorques
        });
    } catch (error) {
        next(error);
    }
};

const getRemorqueById = async (req, res, next) => {
    try {
        const remorque = await remorqueService.getRemorqueById(
            req.params.id
        );

        if (!remorque) {
            return res.status(404).json({
                success: false,
                message: "Remorque introuvable"
            });
        }

        res.status(200).json({
            success: true,
            data: remorque
        });
    } catch (error) {
        next(error);
    }
};

const updateRemorque = async (req, res, next) => {
    try {
        const remorque = await remorqueService.updateRemorque(
            req.params.id,
            req.body
        );

        if (!remorque) {
            return res.status(404).json({
                success: false,
                message: "Remorque introuvable"
            });
        }

        res.status(200).json({
            success: true,
            message: "Remorque modifiée avec succès",
            data: remorque
        });
    } catch (error) {
        next(error);
    }
};

const deleteRemorque = async (req, res, next) => {
    try {
        const remorque =
            await remorqueService.deleteRemorque(req.params.id);

        res.status(200).json({
            success: true,
            message: "Remorque archivée avec succès",
            data: remorque
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createRemorque,
    getAllRemorques,
    getRemorqueById,
    updateRemorque,
    deleteRemorque
};