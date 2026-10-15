
const analyticsRepository = require("../repositories/analyticsRepository");

const getDriversEcoPerformance = async () => {
    return analyticsRepository.getDriversEcoPerformance();
};

module.exports = {
    getDriversEcoPerformance
};
