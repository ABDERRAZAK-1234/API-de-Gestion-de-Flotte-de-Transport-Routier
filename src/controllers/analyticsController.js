
const analyticsService = require("../services/analyticsService");

const getDriversEcoPerformance = async (req, res, next) => {
    try {
        const drivers =
            await analyticsService.getDriversEcoPerformance();

        return res.status(200).json({
            success: true,
            count: drivers.length,
            data: drivers
        });
    } catch (error) {
        return next(error);
    }
};

const getTiresHealthMatrix = async (req, res, next) => {
    try {
        const tires =
            await analyticsService.getTiresHealthMatrix();

        return res.status(200).json({
            success: true,
            count: tires.length,
            data: tires
        });
    } catch (error) {
        return next(error);
    }
};


module.exports = {
    getDriversEcoPerformance,
    getTiresHealthMatrix
};
