jest.mock("../../src/services/maintenanceService", () => ({
    createMaintenance: jest.fn(),
    getAllMaintenances: jest.fn(),
    getMaintenanceById: jest.fn(),
    updateMaintenance: jest.fn(),
    deleteMaintenance: jest.fn(),
}));

const maintenanceService = require("../../src/services/maintenanceService");
const maintenanceController = require("../../src/controllers/maintenanceController");
const {
    runSuccessCase,
    runNotFoundCase,
    runNextErrorCase,
} = require("../helpers/controllerTestUtils");

const body = { type: "VIDANGE", kilometrage: 150000 };
const maintenanceObjet = { _id: "maintenance-123", ...body };
const maintenances = [maintenanceObjet];
const idRequest = { params: { id: "maintenance-123" } };
const bodyRequest = { body };
const updateRequest = { ...idRequest, body };

const successCases = [
    {
        name: "crée maintenance et retourne 201",
        controller: maintenanceController.createMaintenance,
        method: "createMaintenance",
        request: bodyRequest,
        args: (req) => [req.body],
        result: maintenanceObjet,
        status: 201,
        expectedResponse: {
            success: true,
            message: "Maintenance créée avec succès",
            data: maintenanceObjet,
        },
    },
    {
        name: "retourne la liste des maintenances",
        controller: maintenanceController.getAllMaintenances,
        method: "getAllMaintenances",
        args: () => [],
        result: maintenances,
        status: 200,
        expectedResponse: { success: true, data: maintenances },
    },
    {
        name: "retourne maintenance par son ID",
        controller: maintenanceController.getMaintenanceById,
        method: "getMaintenanceById",
        request: idRequest,
        args: (req) => [req.params.id],
        result: maintenanceObjet,
        status: 200,
        expectedResponse: { success: true, data: maintenanceObjet },
    },
    {
        name: "modifie maintenance et retourne 200",
        controller: maintenanceController.updateMaintenance,
        method: "updateMaintenance",
        request: updateRequest,
        args: (req) => [req.params.id, req.body],
        result: maintenanceObjet,
        status: 200,
        expectedResponse: {
            success: true,
            message: "Maintenance modifiée avec succès",
            data: maintenanceObjet,
        },
    },
    {
        name: "supprime maintenance et retourne 200",
        controller: maintenanceController.deleteMaintenance,
        method: "deleteMaintenance",
        request: idRequest,
        args: (req) => [req.params.id],
        result: maintenanceObjet,
        status: 200,
        expectedResponse: {
            success: true,
            message: "Maintenance supprimée avec succès",
        },
    },
];

const notFoundCases = [
    {
        name: "retourne 404 si maintenance est introuvable",
        controller: maintenanceController.getMaintenanceById,
        service: maintenanceService,
        method: "getMaintenanceById",
        request: idRequest,
        args: (req) => [req.params.id],
        message: "Maintenance introuvable",
    },
    {
        name: "retourne 404 lors de la modification si maintenance est introuvable",
        controller: maintenanceController.updateMaintenance,
        service: maintenanceService,
        method: "updateMaintenance",
        request: updateRequest,
        args: (req) => [req.params.id, req.body],
        message: "Maintenance introuvable",
    },
    {
        name: "retourne 404 lors de la suppression si maintenance est introuvable",
        controller: maintenanceController.deleteMaintenance,
        service: maintenanceService,
        method: "deleteMaintenance",
        request: idRequest,
        args: (req) => [req.params.id],
        message: "Maintenance introuvable",
    },
];

const errorCases = [
    {
        name: "createMaintenance",
        controller: maintenanceController.createMaintenance,
        method: "createMaintenance",
        request: bodyRequest,
        args: (req) => [req.body],
    },
    {
        name: "getAllMaintenances",
        controller: maintenanceController.getAllMaintenances,
        method: "getAllMaintenances",
        args: () => [],
    },
    {
        name: "getMaintenanceById",
        controller: maintenanceController.getMaintenanceById,
        method: "getMaintenanceById",
        request: idRequest,
        args: (req) => [req.params.id],
    },
    {
        name: "updateMaintenance",
        controller: maintenanceController.updateMaintenance,
        method: "updateMaintenance",
        request: updateRequest,
        args: (req) => [req.params.id, req.body],
    },
    {
        name: "deleteMaintenance",
        controller: maintenanceController.deleteMaintenance,
        method: "deleteMaintenance",
        request: idRequest,
        args: (req) => [req.params.id],
    },
];

describe("MaintenanceController", () => {
    beforeEach(() => jest.clearAllMocks());
    it.each(successCases)("$name", async (scenario) =>
        runSuccessCase({ ...scenario, service: maintenanceService }),
    );
    it.each(notFoundCases)("$name", async (scenario) =>
        runNotFoundCase(scenario),
    );
    it.each(errorCases)(
        "transmet l'erreur de $name au middleware",
        async (scenario) =>
            runNextErrorCase({ ...scenario, service: maintenanceService }),
    );
});
