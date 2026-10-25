jest.mock("../../src/services/fuelService", () => ({
    createFuel: jest.fn(),
    getAllFuels: jest.fn(),
    getFuelById: jest.fn(),
    updateFuel: jest.fn(),
    deleteFuel: jest.fn(),
}));

const fuelService = require("../../src/services/fuelService");
const fuelController = require("../../src/controllers/fuelController");
const {
    runSuccessCase,
    runNotFoundCase,
    runNextErrorCase,
} = require("../helpers/controllerTestUtils");

const body = { trajet: "trajet-123", volume: 120, prix: 1500 };
const fuelObjet = { _id: "fuel-123", ...body };
const fuels = [fuelObjet];
const idRequest = { params: { id: "fuel-123" } };
const bodyRequest = { body };
const updateRequest = { ...idRequest, body };

const successCases = [
    {
        name: "crée fuel et retourne 201",
        controller: fuelController.createFuel,
        method: "createFuel",
        request: bodyRequest,
        args: (req) => [req.body],
        result: fuelObjet,
        status: 201,
        expectedResponse: {
            success: true,
            message: "Fuel créé avec succès",
            data: fuelObjet,
        },
    },
    {
        name: "retourne la liste des fuels",
        controller: fuelController.getAllFuels,
        method: "getAllFuels",
        args: () => [],
        result: fuels,
        status: 200,
        expectedResponse: { success: true, data: fuels },
    },
    {
        name: "retourne fuel par son ID",
        controller: fuelController.getFuelById,
        method: "getFuelById",
        request: idRequest,
        args: (req) => [req.params.id],
        result: fuelObjet,
        status: 200,
        expectedResponse: { success: true, data: fuelObjet },
    },
    {
        name: "modifie fuel et retourne 200",
        controller: fuelController.updateFuel,
        method: "updateFuel",
        request: updateRequest,
        args: (req) => [req.params.id, req.body],
        result: fuelObjet,
        status: 200,
        expectedResponse: {
            success: true,
            message: "Fuel modifié avec succès",
            data: fuelObjet,
        },
    },
    {
        name: "supprime fuel et retourne 200",
        controller: fuelController.deleteFuel,
        method: "deleteFuel",
        request: idRequest,
        args: (req) => [req.params.id],
        result: fuelObjet,
        status: 200,
        expectedResponse: { success: true, message: "Fuel supprimé avec succès" },
    },
];

const notFoundCases = [
    {
        name: "retourne 404 si fuel est introuvable",
        controller: fuelController.getFuelById,
        service: fuelService,
        method: "getFuelById",
        request: idRequest,
        args: (req) => [req.params.id],
        message: "Fuel introuvable",
    },
    {
        name: "retourne 404 lors de la modification si fuel est introuvable",
        controller: fuelController.updateFuel,
        service: fuelService,
        method: "updateFuel",
        request: updateRequest,
        args: (req) => [req.params.id, req.body],
        message: "Fuel introuvable",
    },
    {
        name: "retourne 404 lors de la suppression si fuel est introuvable",
        controller: fuelController.deleteFuel,
        service: fuelService,
        method: "deleteFuel",
        request: idRequest,
        args: (req) => [req.params.id],
        message: "Fuel introuvable",
    },
];

const errorCases = [
    {
        name: "createFuel",
        controller: fuelController.createFuel,
        method: "createFuel",
        request: bodyRequest,
        args: (req) => [req.body],
    },
    {
        name: "getAllFuels",
        controller: fuelController.getAllFuels,
        method: "getAllFuels",
        args: () => [],
    },
    {
        name: "getFuelById",
        controller: fuelController.getFuelById,
        method: "getFuelById",
        request: idRequest,
        args: (req) => [req.params.id],
    },
    {
        name: "updateFuel",
        controller: fuelController.updateFuel,
        method: "updateFuel",
        request: updateRequest,
        args: (req) => [req.params.id, req.body],
    },
    {
        name: "deleteFuel",
        controller: fuelController.deleteFuel,
        method: "deleteFuel",
        request: idRequest,
        args: (req) => [req.params.id],
    },
];

describe("FuelController", () => {
    beforeEach(() => jest.clearAllMocks());
    it.each(successCases)("$name", async (scenario) =>
        runSuccessCase({ ...scenario, service: fuelService }),
    );
    it.each(notFoundCases)("$name", async (scenario) =>
        runNotFoundCase(scenario),
    );
    it.each(errorCases)(
        "transmet l'erreur de $name au middleware",
        async (scenario) => runNextErrorCase({ ...scenario, service: fuelService }),
    );
});
