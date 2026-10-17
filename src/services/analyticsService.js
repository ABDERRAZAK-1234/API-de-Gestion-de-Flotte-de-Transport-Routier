
const analyticsRepository = require("../repositories/analyticsRepository");
const pneuAnalyticsRepository = require("../repositories/pneuAnalyticsRepository");

const getDriversEcoPerformance = async () => {
    return analyticsRepository.getDriversEcoPerformance();
};

const getTiresHealthMatrix = async () => {
    return pneuAnalyticsRepository.getTiresHealthMatrix();
};

module.exports = {
    getDriversEcoPerformance,
    getTiresHealthMatrix
};
