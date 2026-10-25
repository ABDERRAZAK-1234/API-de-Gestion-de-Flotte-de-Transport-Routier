jest.mock("../../src/services/pneuService", () => ({
    createPneu: jest.fn(),
    getAllPneus: jest.fn(),
    getPneuById: jest.fn(),
    updatePneu: jest.fn(),
    deletePneu: jest.fn(),
}));

const pneuService = require("../../src/services/pneuService");
const pneuController = require("../../src/controllers/pneuController");
const {
    runSuccessCase,
    runNotFoundCase,
    runNextErrorCase,
} = require("../helpers/controllerTestUtils");

const body = { reference: "PNEU-TEST", position: "AVANT_GAUCHE" };
const pneuObjet = { _id: "pneu-123", ...body };
const pneus = [pneuObjet];
const idRequest = { params: { id: "pneu-123" } };
const bodyRequest = { body };
const updateRequest = { ...idRequest, body };

const successCases = [
    {
        name: "crée pneu et retourne 201",
        controller: pneuController.createPneu,
        method: "createPneu",
        request: bodyRequest,
        args: (req) => [req.body],
        result: pneuObjet,
        status: 201,
        expectedResponse: {
            success: true,
            message: "Pneu créé avec succès",
            data: pneuObjet,
        },
    },
    {
        name: "retourne la liste des pneus",
        controller: pneuController.getAllPneus,
        method: "getAllPneus",
        args: () => [],
        result: pneus,
        status: 200,
        expectedResponse: { success: true, data: pneus },
    },
    {
        name: "retourne pneu par son ID",
        controller: pneuController.getPneuById,
        method: "getPneuById",
        request: idRequest,
        args: (req) => [req.params.id],
        result: pneuObjet,
        status: 200,
        expectedResponse: { success: true, data: pneuObjet },
    },
    {
        name: "modifie pneu et retourne 200",
        controller: pneuController.updatePneu,
        method: "updatePneu",
        request: updateRequest,
        args: (req) => [req.params.id, req.body],
        result: pneuObjet,
        status: 200,
        expectedResponse: {
            success: true,
            message: "Pneu modifié avec succès",
            data: pneuObjet,
        },
    },
    {
        name: "supprime pneu et retourne 200",
        controller: pneuController.deletePneu,
        method: "deletePneu",
        request: idRequest,
        args: (req) => [req.params.id],
        result: pneuObjet,
        status: 200,
        expectedResponse: { success: true, message: "Pneu supprimé avec succès" },
    },
];

const notFoundCases = [
    {
        name: "retourne 404 si pneu est introuvable",
        controller: pneuController.getPneuById,
        service: pneuService,
        method: "getPneuById",
        request: idRequest,
        args: (req) => [req.params.id],
        message: "Pneu introuvable",
    },
    {
        name: "retourne 404 lors de la modification si pneu est introuvable",
        controller: pneuController.updatePneu,
        service: pneuService,
        method: "updatePneu",
        request: updateRequest,
        args: (req) => [req.params.id, req.body],
        message: "Pneu introuvable",
    },
    {
        name: "retourne 404 lors de la suppression si pneu est introuvable",
        controller: pneuController.deletePneu,
        service: pneuService,
        method: "deletePneu",
        request: idRequest,
        args: (req) => [req.params.id],
        message: "Pneu introuvable",
    },
];

const errorCases = [
    {
        name: "createPneu",
        controller: pneuController.createPneu,
        method: "createPneu",
        request: bodyRequest,
        args: (req) => [req.body],
    },
    {
        name: "getAllPneus",
        controller: pneuController.getAllPneus,
        method: "getAllPneus",
        args: () => [],
    },
    {
        name: "getPneuById",
        controller: pneuController.getPneuById,
        method: "getPneuById",
        request: idRequest,
        args: (req) => [req.params.id],
    },
    {
        name: "updatePneu",
        controller: pneuController.updatePneu,
        method: "updatePneu",
        request: updateRequest,
        args: (req) => [req.params.id, req.body],
    },
    {
        name: "deletePneu",
        controller: pneuController.deletePneu,
        method: "deletePneu",
        request: idRequest,
        args: (req) => [req.params.id],
    },
];

describe("PneuController", () => {
    beforeEach(() => jest.clearAllMocks());
    it.each(successCases)("$name", async (scenario) =>
        runSuccessCase({ ...scenario, service: pneuService }),
    );
    it.each(notFoundCases)("$name", async (scenario) =>
        runNotFoundCase(scenario),
    );
    it.each(errorCases)(
        "transmet l'erreur de $name au middleware",
        async (scenario) => runNextErrorCase({ ...scenario, service: pneuService }),
    );
});
