jest.mock("../../src/services/remorqueService", () => ({
    createRemorque: jest.fn(),
    getAllRemorques: jest.fn(),
    getRemorqueById: jest.fn(),
    updateRemorque: jest.fn(),
    deleteRemorque: jest.fn(),
}));

const remorqueService = require("../../src/services/remorqueService");
const remorqueController = require("../../src/controllers/remorqueController");
const {
    runSuccessCase,
    runNotFoundCase,
    runNextErrorCase,
} = require("../helpers/controllerTestUtils");

const body = { immatriculation: "45678-S-777", marque: "Krone" };
const remorque = { _id: "remorque-123", ...body };
const remorques = [remorque];
const idRequest = { params: { id: "remorque-123" } };
const bodyRequest = { body };

const successCases = [
    {
        name: "crée une remorque et retourne 201",
        controller: remorqueController.createRemorque,
        method: "createRemorque",
        request: bodyRequest,
        args: (req) => [req.body],
        result: remorque,
        status: 201,
        expectedResponse: {
            success: true,
            message: "Remorque créée avec succès",
            data: remorque,
        },
    },
    {
        name: "retourne la liste des remorques",
        controller: remorqueController.getAllRemorques,
        method: "getAllRemorques",
        args: () => [],
        result: remorques,
        status: 200,
        expectedResponse: { success: true, data: remorques },
    },
    {
        name: "retourne une remorque par son ID",
        controller: remorqueController.getRemorqueById,
        method: "getRemorqueById",
        request: idRequest,
        args: (req) => [req.params.id],
        result: remorque,
        status: 200,
        expectedResponse: { success: true, data: remorque },
    },
    {
        name: "modifie une remorque et retourne 200",
        controller: remorqueController.updateRemorque,
        method: "updateRemorque",
        request: { ...idRequest, body },
        args: (req) => [req.params.id, req.body],
        result: remorque,
        status: 200,
        expectedResponse: {
            success: true,
            message: "Remorque modifiée avec succès",
            data: remorque,
        },
    },
    {
        name: "archive une remorque et retourne 200",
        controller: remorqueController.deleteRemorque,
        method: "deleteRemorque",
        request: idRequest,
        args: (req) => [req.params.id],
        result: remorque,
        status: 200,
        expectedResponse: {
            success: true,
            message: "Remorque archivée avec succès",
            data: remorque,
        },
    },
];
const notFoundCases = [
    {
        name: "retourne 404 si la remorque est introuvable",
        controller: remorqueController.getRemorqueById,
        service: remorqueService,
        method: "getRemorqueById",
        request: idRequest,
        args: (req) => [req.params.id],
        message: "Remorque introuvable",
    },
    {
        name: "retourne 404 lors de la modification si la remorque est introuvable",
        controller: remorqueController.updateRemorque,
        service: remorqueService,
        method: "updateRemorque",
        request: { ...idRequest, body },
        args: (req) => [req.params.id, req.body],
        message: "Remorque introuvable",
    },
];
const errorCases = [
    {
        name: "createRemorque",
        controller: remorqueController.createRemorque,
        method: "createRemorque",
        request: bodyRequest,
        args: (req) => [req.body],
    },
    {
        name: "getAllRemorques",
        controller: remorqueController.getAllRemorques,
        method: "getAllRemorques",
        args: () => [],
    },
    {
        name: "getRemorqueById",
        controller: remorqueController.getRemorqueById,
        method: "getRemorqueById",
        request: idRequest,
        args: (req) => [req.params.id],
    },
    {
        name: "updateRemorque",
        controller: remorqueController.updateRemorque,
        method: "updateRemorque",
        request: { ...idRequest, body },
        args: (req) => [req.params.id, req.body],
    },
    {
        name: "deleteRemorque",
        controller: remorqueController.deleteRemorque,
        method: "deleteRemorque",
        request: idRequest,
        args: (req) => [req.params.id],
    },
];

describe("RemorqueController", () => {
    beforeEach(() => jest.clearAllMocks());
    it.each(successCases)("$name", async (scenario) =>
        runSuccessCase({ ...scenario, service: remorqueService }),
    );
    it.each(notFoundCases)("$name", async (scenario) =>
        runNotFoundCase(scenario),
    );
    it.each(errorCases)(
        "transmet l'erreur de $name au middleware",
        async (scenario) =>
            runNextErrorCase({ ...scenario, service: remorqueService }),
    );
});
