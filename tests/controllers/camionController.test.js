jest.mock("../../src/services/camionService", () => ({
    createCamion: jest.fn(),
    getAllCamions: jest.fn(),
    getCamionById: jest.fn(),
    updateCamion: jest.fn(),
    deleteCamion: jest.fn(),
}));

const camionService = require("../../src/services/camionService");
const camionController = require("../../src/controllers/camionController");
const {
    runSuccessCase,
    runNotFoundCase,
    runNextErrorCase,
} = require("../helpers/controllerTestUtils");

const body = { immatriculation: "12345-A-6", marque: "Scania" };
const camion = { _id: "camion-123", ...body };
const camions = [camion];
const idRequest = { params: { id: "camion-123" } };
const bodyRequest = { body };

const successCases = [
    {
        name: "crée un camion et retourne 201",
        controller: camionController.createCamion,
        method: "createCamion",
        request: bodyRequest,
        args: (req) => [req.body],
        result: camion,
        status: 201,
        expectedResponse: {
            success: true,
            message: "Camion créé avec succès",
            data: camion,
        },
    },
    {
        name: "retourne la liste des camions",
        controller: camionController.getAllCamions,
        method: "getAllCamions",
        args: () => [],
        result: camions,
        status: 200,
        expectedResponse: { success: true, data: camions },
    },
    {
        name: "retourne un camion par son ID",
        controller: camionController.getCamionById,
        method: "getCamionById",
        request: idRequest,
        args: (req) => [req.params.id],
        result: camion,
        status: 200,
        expectedResponse: { success: true, data: camion },
    },
    {
        name: "modifie un camion et retourne 200",
        controller: camionController.updateCamion,
        method: "updateCamion",
        request: { ...idRequest, body },
        args: (req) => [req.params.id, req.body],
        result: camion,
        status: 200,
        expectedResponse: {
            success: true,
            message: "Camion modifié avec succès",
            data: camion,
        },
    },
    {
        name: "archive un camion et retourne 200",
        controller: camionController.deleteCamion,
        method: "deleteCamion",
        request: idRequest,
        args: (req) => [req.params.id],
        result: camion,
        status: 200,
        expectedResponse: {
            success: true,
            message: "Camion archivé avec succès",
            data: camion,
        },
    },
];

const notFoundCases = [
    {
        name: "retourne 404 si le camion est introuvable",
        controller: camionController.getCamionById,
        service: camionService,
        method: "getCamionById",
        request: idRequest,
        args: (req) => [req.params.id],
        message: "Camion introuvable",
    },
    {
        name: "retourne 404 lors de la modification si le camion est introuvable",
        controller: camionController.updateCamion,
        service: camionService,
        method: "updateCamion",
        request: { ...idRequest, body },
        args: (req) => [req.params.id, req.body],
        message: "Camion introuvable",
    },
];

const errorCases = [
    {
        name: "createCamion",
        controller: camionController.createCamion,
        method: "createCamion",
        request: bodyRequest,
        args: (req) => [req.body],
    },
    {
        name: "getAllCamions",
        controller: camionController.getAllCamions,
        method: "getAllCamions",
        args: () => [],
    },
    {
        name: "getCamionById",
        controller: camionController.getCamionById,
        method: "getCamionById",
        request: idRequest,
        args: (req) => [req.params.id],
    },
    {
        name: "updateCamion",
        controller: camionController.updateCamion,
        method: "updateCamion",
        request: { ...idRequest, body },
        args: (req) => [req.params.id, req.body],
    },
    {
        name: "deleteCamion",
        controller: camionController.deleteCamion,
        method: "deleteCamion",
        request: idRequest,
        args: (req) => [req.params.id],
    },
];

describe("CamionController", () => {
    beforeEach(() => jest.clearAllMocks());
    it.each(successCases)("$name", async (scenario) =>
        runSuccessCase({ ...scenario, service: camionService }),
    );
    it.each(notFoundCases)("$name", async (scenario) =>
        runNotFoundCase(scenario),
    );
    it.each(errorCases)(
        "transmet l'erreur de $name au middleware",
        async (scenario) =>
            runNextErrorCase({ ...scenario, service: camionService }),
    );
});
