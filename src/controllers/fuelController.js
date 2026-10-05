const fuelService = require("../services/fuelService");

const createFuel = async (req, res, next) => {
    try {
        const fuel = await fuelService.createFuel(req.body);

        res.status(201).json({
            success: true,
            message: "Fuel créé avec succès",
            data: fuel
        });
    } catch (error) {
        next(error);
    }
};

const getAllFuels = async (req, res, next) => {
    try {
        const fuels = await fuelService.getAllFuels();

        res.status(200).json({
            success: true,
            data: fuels
        });
    } catch (error) {
        next(error);
    }
};

const getFuelById = async (req, res, next) => {
    try {
        const fuel = await fuelService.getFuelById(
            req.params.id
        );

        if (!fuel) {
            return res.status(404).json({
                success: false,
                message: "Fuel introuvable"
            });
        }

        res.status(200).json({
            success: true,
            data: fuel
        });
    } catch (error) {
        next(error);
    }
};

const updateFuel = async (req, res, next) => {
    try {
        const fuel = await fuelService.updateFuel(
            req.params.id,
            req.body
        );

        if (!fuel) {
            return res.status(404).json({
                success: false,
                message: "Fuel introuvable"
            });
        }

        res.status(200).json({
            success: true,
            message: "Fuel modifié avec succès",
            data: fuel
        });
    } catch (error) {
        next(error);
    }
};

const deleteFuel = async (req, res, next) => {
    try {
        const fuel = await fuelService.deleteFuel(
            req.params.id
        );

        if (!fuel) {
            return res.status(404).json({
                success: false,
                message: "Fuel introuvable"
            });
        }

        res.status(200).json({
            success: true,
            message: "Fuel supprimé avec succès"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createFuel,
    getAllFuels,
    getFuelById,
    updateFuel,
    deleteFuel
};