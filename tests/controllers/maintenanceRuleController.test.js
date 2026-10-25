jest.mock("../../src/services/maintenanceRuleService", () => ({
    createMaintenanceRule: jest.fn(),
    getAllMaintenanceRules: jest.fn(),
    getMaintenanceRuleById: jest.fn(),
    updateMaintenanceRule: jest.fn(),
    deleteMaintenanceRule: jest.fn(),
}));

const maintenanceRuleService = require("../../src/services/maintenanceRuleService");
const maintenanceRuleController = require("../../src/controllers/maintenanceRuleController");
const {
    runSuccessCase,
    runNotFoundCase,
    runNextErrorCase,
} = require("../helpers/controllerTestUtils");

const body = { type: "VIDANGE", seuilKilometrage: 10000 };
const maintenanceRuleObjet = { _id: "maintenanceRule-123", ...body };
const maintenanceRules = [maintenanceRuleObjet];
const idRequest = { params: { id: "maintenanceRule-123" } };
const bodyRequest = { body };
const updateRequest = { ...idRequest, body };

const successCases = [
    {
        name: "crée maintenanceRule et retourne 201",
        controller: maintenanceRuleController.createMaintenanceRule,
        method: "createMaintenanceRule",
        request: bodyRequest,
        args: (req) => [req.body],
        result: maintenanceRuleObjet,
        status: 201,
        expectedResponse: {
            success: true,
            message: "Maintenance rule créée avec succès",
            data: maintenanceRuleObjet,
        },
    },
    {
        name: "retourne la liste des maintenanceRules",
        controller: maintenanceRuleController.getAllMaintenanceRules,
        method: "getAllMaintenanceRules",
        args: () => [],
        result: maintenanceRules,
        status: 200,
        expectedResponse: { success: true, data: maintenanceRules },
    },
    {
        name: "retourne maintenanceRule par son ID",
        controller: maintenanceRuleController.getMaintenanceRuleById,
        method: "getMaintenanceRuleById",
        request: idRequest,
        args: (req) => [req.params.id],
        result: maintenanceRuleObjet,
        status: 200,
        expectedResponse: { success: true, data: maintenanceRuleObjet },
    },
    {
        name: "modifie maintenanceRule et retourne 200",
        controller: maintenanceRuleController.updateMaintenanceRule,
        method: "updateMaintenanceRule",
        request: updateRequest,
        args: (req) => [req.params.id, req.body],
        result: maintenanceRuleObjet,
        status: 200,
        expectedResponse: {
            success: true,
            message: "Maintenance rule modifiée avec succès",
            data: maintenanceRuleObjet,
        },
    },
    {
        name: "supprime maintenanceRule et retourne 200",
        controller: maintenanceRuleController.deleteMaintenanceRule,
        method: "deleteMaintenanceRule",
        request: idRequest,
        args: (req) => [req.params.id],
        result: maintenanceRuleObjet,
        status: 200,
        expectedResponse: {
            success: true,
            message: "Maintenance rule supprimée avec succès",
        },
    },
];

const notFoundCases = [
    {
        name: "retourne 404 si maintenanceRule est introuvable",
        controller: maintenanceRuleController.getMaintenanceRuleById,
        service: maintenanceRuleService,
        method: "getMaintenanceRuleById",
        request: idRequest,
        args: (req) => [req.params.id],
        message: "Maintenance rule introuvable",
    },
    {
        name: "retourne 404 lors de la modification si maintenanceRule est introuvable",
        controller: maintenanceRuleController.updateMaintenanceRule,
        service: maintenanceRuleService,
        method: "updateMaintenanceRule",
        request: updateRequest,
        args: (req) => [req.params.id, req.body],
        message: "Maintenance rule introuvable",
    },
    {
        name: "retourne 404 lors de la suppression si maintenanceRule est introuvable",
        controller: maintenanceRuleController.deleteMaintenanceRule,
        service: maintenanceRuleService,
        method: "deleteMaintenanceRule",
        request: idRequest,
        args: (req) => [req.params.id],
        message: "Maintenance rule introuvable",
    },
];

const errorCases = [
    {
        name: "createMaintenanceRule",
        controller: maintenanceRuleController.createMaintenanceRule,
        method: "createMaintenanceRule",
        request: bodyRequest,
        args: (req) => [req.body],
    },
    {
        name: "getAllMaintenanceRules",
        controller: maintenanceRuleController.getAllMaintenanceRules,
        method: "getAllMaintenanceRules",
        args: () => [],
    },
    {
        name: "getMaintenanceRuleById",
        controller: maintenanceRuleController.getMaintenanceRuleById,
        method: "getMaintenanceRuleById",
        request: idRequest,
        args: (req) => [req.params.id],
    },
    {
        name: "updateMaintenanceRule",
        controller: maintenanceRuleController.updateMaintenanceRule,
        method: "updateMaintenanceRule",
        request: updateRequest,
        args: (req) => [req.params.id, req.body],
    },
    {
        name: "deleteMaintenanceRule",
        controller: maintenanceRuleController.deleteMaintenanceRule,
        method: "deleteMaintenanceRule",
        request: idRequest,
        args: (req) => [req.params.id],
    },
];

describe("MaintenanceRuleController", () => {
    beforeEach(() => jest.clearAllMocks());
    it.each(successCases)("$name", async (scenario) =>
        runSuccessCase({ ...scenario, service: maintenanceRuleService }),
    );
    it.each(notFoundCases)("$name", async (scenario) =>
        runNotFoundCase(scenario),
    );
    it.each(errorCases)(
        "transmet l'erreur de $name au middleware",
        async (scenario) =>
            runNextErrorCase({ ...scenario, service: maintenanceRuleService }),
    );
});
