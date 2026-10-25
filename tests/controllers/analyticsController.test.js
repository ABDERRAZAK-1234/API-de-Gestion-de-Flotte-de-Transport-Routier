jest.mock("../../src/services/analyticsService", () => ({
    getDriversEcoPerformance: jest.fn(),
    getTiresHealthMatrix: jest.fn(),
    getTripsFinancialEsg: jest.fn(),
    getFleetUtilizationTrends: jest.fn(),
}));

const analyticsService = require("../../src/services/analyticsService");
const analyticsController = require("../../src/controllers/analyticsController");
const {
    runSuccessCase,
    runNextErrorCase,
} = require("../helpers/controllerTestUtils");

const drivers = [{ chauffeur: "driver-1", score: 95 }];
const tires = [{ position: "AVANT_GAUCHE", nombrePneus: 1 }];
const financialData = [{ corridor: "Agadir-Casablanca", totalLitres: 100 }];
const utilizationData = [
    { camionId: "camion-123", tauxUtilisationPourcent: 75 },
];
const queryRequest = {
    query: { startDate: "2026-01-01", endDate: "2026-01-31" },
};
const monthsRequest = { query: { months: "6" } };

const successCases = [
    {
        name: "retourne les performances éco des chauffeurs",
        controller: analyticsController.getDriversEcoPerformance,
        method: "getDriversEcoPerformance",
        args: () => [],
        result: drivers,
        status: 200,
        expectedResponse: { success: true, count: drivers.length, data: drivers },
    },
    {
        name: "retourne la matrice de santé des pneus",
        controller: analyticsController.getTiresHealthMatrix,
        method: "getTiresHealthMatrix",
        args: () => [],
        result: tires,
        status: 200,
        expectedResponse: { success: true, count: tires.length, data: tires },
    },
    {
        name: "retourne les données financières ESG avec les dates",
        controller: analyticsController.getTripsFinancialEsg,
        method: "getTripsFinancialEsg",
        request: queryRequest,
        args: (req) => [
            { startDate: req.query.startDate, endDate: req.query.endDate },
        ],
        result: financialData,
        status: 200,
        expectedResponse: {
            success: true,
            count: financialData.length,
            data: financialData,
        },
    },
    {
        name: "retourne les tendances d'utilisation de la flotte",
        controller: analyticsController.getFleetUtilizationTrends,
        method: "getFleetUtilizationTrends",
        request: monthsRequest,
        args: (req) => [{ months: req.query.months }],
        result: utilizationData,
        status: 200,
        expectedResponse: {
            success: true,
            count: utilizationData.length,
            data: utilizationData,
        },
    },
];

const errorCases = [
    {
        name: "getDriversEcoPerformance",
        controller: analyticsController.getDriversEcoPerformance,
        method: "getDriversEcoPerformance",
        args: () => [],
    },
    {
        name: "getTiresHealthMatrix",
        controller: analyticsController.getTiresHealthMatrix,
        method: "getTiresHealthMatrix",
        args: () => [],
    },
    {
        name: "getTripsFinancialEsg",
        controller: analyticsController.getTripsFinancialEsg,
        request: queryRequest,
        method: "getTripsFinancialEsg",
        args: (req) => [
            { startDate: req.query.startDate, endDate: req.query.endDate },
        ],
    },
    {
        name: "getFleetUtilizationTrends",
        controller: analyticsController.getFleetUtilizationTrends,
        request: monthsRequest,
        method: "getFleetUtilizationTrends",
        args: (req) => [{ months: req.query.months }],
    },
];

describe("AnalyticsController", () => {
    beforeEach(() => jest.clearAllMocks());
    it.each(successCases)("$name", async (scenario) =>
        runSuccessCase({ ...scenario, service: analyticsService }),
    );
    it.each(errorCases)(
        "transmet l'erreur de $name au middleware",
        async (scenario) =>
            runNextErrorCase({ ...scenario, service: analyticsService }),
    );
});
