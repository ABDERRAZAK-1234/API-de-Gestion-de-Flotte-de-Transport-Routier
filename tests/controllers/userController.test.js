jest.mock("../../src/services/userService", () => ({
    getPendingUsers: jest.fn(),
    validateUser: jest.fn(),
    rejectUser: jest.fn(),
    getAllUsers: jest.fn(),
    getUserById: jest.fn(),
    updateUser: jest.fn(),
    suspendUser: jest.fn(),
    reactivateUser: jest.fn(),
}));

const userService = require("../../src/services/userService");
const userController = require("../../src/controllers/userController");
const {
    runSuccessCase,
    runNextErrorCase,
} = require("../helpers/controllerTestUtils");

const user = {
    _id: "user-456",
    nom: "Aamaich",
    prenom: "Abderrazak",
    role: "CHAUFFEUR",
};
const users = [user];
const idRequest = { params: { id: "user-456" } };
const body = { nom: "Aamaich Modifié" };
const updateRequest = { ...idRequest, body };

const successCases = [
    {
        name: "retourne les utilisateurs en attente",
        controller: userController.pending,
        method: "getPendingUsers",
        args: (req) => [req.user],
        result: users,
        status: 200,
        expectedResponse: { success: true, data: users },
    },
    {
        name: "valide un utilisateur",
        controller: userController.validate,
        method: "validateUser",
        request: idRequest,
        args: (req) => [req.params.id, req.user],
        result: user,
        status: 200,
        expectedResponse: {
            success: true,
            message: "Utilisateur validé avec succès",
            data: user,
        },
    },
    {
        name: "rejette un utilisateur",
        controller: userController.reject,
        method: "rejectUser",
        request: idRequest,
        args: (req) => [req.params.id, req.user],
        result: user,
        status: 200,
        expectedResponse: {
            success: true,
            message: "Utilisateur rejeté avec succès",
            data: user,
        },
    },
    {
        name: "retourne tous les utilisateurs",
        controller: userController.getAllUsers,
        method: "getAllUsers",
        args: (req) => [req.user],
        result: users,
        status: 200,
        expectedResponse: { success: true, data: users },
    },
    {
        name: "retourne un utilisateur par ID",
        controller: userController.getUserById,
        method: "getUserById",
        request: idRequest,
        args: (req) => [req.params.id, req.user],
        result: user,
        status: 200,
        expectedResponse: { success: true, data: user },
    },
    {
        name: "modifie un utilisateur",
        controller: userController.updateUser,
        method: "updateUser",
        request: updateRequest,
        args: (req) => [req.params.id, req.body, req.user],
        result: user,
        status: 200,
        expectedResponse: {
            success: true,
            message: "Utilisateur modifié avec succès",
            data: user,
        },
    },
    {
        name: "suspend un utilisateur",
        controller: userController.suspend,
        method: "suspendUser",
        request: idRequest,
        args: (req) => [req.params.id, req.user],
        result: user,
        status: 200,
        expectedResponse: {
            success: true,
            message: "Utilisateur suspendu avec succès",
            data: user,
        },
    },
    {
        name: "réactive un utilisateur",
        controller: userController.reactivate,
        method: "reactivateUser",
        request: idRequest,
        args: (req) => [req.params.id, req.user],
        result: user,
        status: 200,
        expectedResponse: {
            success: true,
            message: "Utilisateur réactivé avec succès",
            data: user,
        },
    },
];

const errorCases = [
    {
        name: "pending",
        controller: userController.pending,
        method: "getPendingUsers",
        args: (req) => [req.user],
    },
    {
        name: "validate",
        controller: userController.validate,
        method: "validateUser",
        request: idRequest,
        args: (req) => [req.params.id, req.user],
    },
    {
        name: "reject",
        controller: userController.reject,
        method: "rejectUser",
        request: idRequest,
        args: (req) => [req.params.id, req.user],
    },
    {
        name: "getAllUsers",
        controller: userController.getAllUsers,
        method: "getAllUsers",
        args: (req) => [req.user],
    },
    {
        name: "getUserById",
        controller: userController.getUserById,
        method: "getUserById",
        request: idRequest,
        args: (req) => [req.params.id, req.user],
    },
    {
        name: "updateUser",
        controller: userController.updateUser,
        method: "updateUser",
        request: updateRequest,
        args: (req) => [req.params.id, req.body, req.user],
    },
    {
        name: "suspend",
        controller: userController.suspend,
        method: "suspendUser",
        request: idRequest,
        args: (req) => [req.params.id, req.user],
    },
    {
        name: "reactivate",
        controller: userController.reactivate,
        method: "reactivateUser",
        request: idRequest,
        args: (req) => [req.params.id, req.user],
    },
];

describe("UserController", () => {
    beforeEach(() => jest.clearAllMocks());
    it.each(successCases)("$name", async (scenario) =>
        runSuccessCase({ ...scenario, service: userService }),
    );
    it.each(errorCases)(
        "transmet l'erreur de $name au middleware",
        async (scenario) => runNextErrorCase({ ...scenario, service: userService }),
    );
});
