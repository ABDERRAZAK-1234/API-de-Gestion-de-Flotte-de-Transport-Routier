
const analyticsRepository = require("../repositories/analyticsRepository");
const pneuAnalyticsRepository = require("../repositories/pneuAnalyticsRepository");
const tripsFinancialEsgRepository = require("../repositories/tripsFinancialEsgRepository");


const getDriversEcoPerformance = async () => {
    return analyticsRepository.getDriversEcoPerformance();
};

const getTiresHealthMatrix = async () => {
    return pneuAnalyticsRepository.getTiresHealthMatrix();
};

const parseDate = (value, field, isEndDate = false) => {
    if (!value) {
        return undefined;
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        const error = new Error(
            `${field} doit être une date valide`
        );
        error.statusCode = 400;
        throw error;
    }

    if (
        isEndDate &&
        /^\d{4}-\d{2}-\d{2}$/.test(value)
    ) {
        date.setUTCHours(23, 59, 59, 999);
    }

    return date;
};


const getTripsFinancialEsg = async ({
    startDate,
    endDate
} = {}) => {
    const filters = {
        startDate: parseDate(startDate, "startDate"),
        endDate: parseDate(endDate, "endDate", true)
    };

    if (
        filters.startDate &&
        filters.endDate &&
        filters.startDate > filters.endDate
    ) {
        const error = new Error(
            "startDate doit être antérieure ou égale à endDate"
        );
        error.statusCode = 400;
        throw error;
    }

    return tripsFinancialEsgRepository.getTripsFinancialEsg(filters);
};

module.exports = {
    getDriversEcoPerformance,
    getTiresHealthMatrix,
    getTripsFinancialEsg
};
