jest.mock("../../src/services/authService", () => ({
    register: jest.fn(),
    login: jest.fn(),
}));

const authService = require("../../src/services/authService");
const { register, login } = require("../../src/controllers/authController");
const { createMocks } = require("../helpers/controllerTestUtils");

const credentials = { email: "driver@example.com", password: "password123" };

describe("AuthController", () => {
    beforeEach(() => jest.clearAllMocks());

    describe("register", () => {
        it("devrait créer un compte et retourner 201", async () => {
            const user = { _id: "user-123", email: credentials.email };
            const { req, res } = createMocks({ body: credentials });
            authService.register.mockResolvedValue(user);

            await register(req, res);

            expect(authService.register).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                message: "Compte crée, En attente de validation de l'admin",
                data: user,
            });
        });

        it("devrait retourner 400 si l'inscription échoue", async () => {
            const error = new Error("Email déjà utilisé");
            const { req, res } = createMocks({ body: credentials });
            authService.register.mockRejectedValue(error);

            await register(req, res);

            expect(authService.register).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: "Email déjà utilisé",
            });
        });
    });

    describe("login", () => {
        it("devrait authentifier l'utilisateur et retourner 200", async () => {
            const data = { token: "jwt-token", user: { id: "user-123" } };
            const { req, res } = createMocks({ body: credentials });
            authService.login.mockResolvedValue(data);

            await login(req, res);

            expect(authService.login).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                message: "Login successful",
                data,
            });
        });

        it("devrait retourner le statusCode fourni par le service", async () => {
            const error = Object.assign(new Error("Identifiants invalides"), {
                statusCode: 401,
            });
            const { req, res } = createMocks({ body: credentials });
            authService.login.mockRejectedValue(error);

            await login(req, res);

            expect(authService.login).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: "Identifiants invalides",
            });
        });

        it("devrait retourner 500 si l'erreur ne contient pas de statusCode", async () => {
            const error = new Error("Erreur inattendue");
            const { req, res } = createMocks({ body: credentials });
            authService.login.mockRejectedValue(error);

            await login(req, res);

            expect(authService.login).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: "Erreur inattendue",
            });
        });
    });
});
