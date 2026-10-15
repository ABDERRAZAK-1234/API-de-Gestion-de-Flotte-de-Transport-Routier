
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

module.exports = {
    getDriversEcoPerformance
};
