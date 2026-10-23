jest.mock("../../src/services/trajetService", () => ({
    createTrajet: jest.fn(),
    getAllTrajets: jest.fn(),
    getTrajetById: jest.fn(),
    updateTrajet: jest.fn(),
    deleteTrajet: jest.fn(),
}));

const trajetService = require("../../src/services/trajetService");

const {
    createTrajet,
    getAllTrajets,
    getTrajetById,
    updateTrajet,
    deleteTrajet,
} = require("../../src/controllers/trajetController");

const createMocks = ({
    body = {},
    params = {},
    user = { id: "user-123", role: "ADMIN" },
} = {}) => {
    const req = { body, params, user };

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    const next = jest.fn();

    return { req, res, next };
};

describe("TrajetController", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("createTrajet", () => {
        it("devrait créer un trajet et retourner 201", async () => {
            const body = {
                lieuDepart: "Youssoufia",
                lieuArrivee: "Agadir",
                marchandise: "Matériaux",
            };

            const trajet = {
                _id: "trajet-123",
                ...body,
            };

            const { req, res, next } = createMocks({ body });

            trajetService.createTrajet.mockResolvedValue(trajet);

            await createTrajet(req, res, next);

            expect(trajetService.createTrajet).toHaveBeenCalledWith(
                req.body,
                req.user,
            );

            expect(res.status).toHaveBeenCalledWith(201);

            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    success: true,
                    data: trajet,
                }),
            );

            expect(next).not.toHaveBeenCalled();
        });

        it("devrait transmettre l'erreur au middleware", async () => {
            const error = new Error("Erreur serveur");

            const { req, res, next } = createMocks();

            trajetService.createTrajet.mockRejectedValue(error);

            await createTrajet(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
            expect(res.json).not.toHaveBeenCalled();
        });
    });

    describe("getAllTrajets", () => {
        it("devrait retourner la liste des trajets", async () => {
            const trajets = [{ _id: "trajet-1" }, { _id: "trajet-2" }];

            const { req, res, next } = createMocks();

            trajetService.getAllTrajets.mockResolvedValue(trajets);

            await getAllTrajets(req, res, next);

            expect(trajetService.getAllTrajets).toHaveBeenCalledWith(req.user);

            expect(res.status).toHaveBeenCalledWith(200);

            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    success: true,
                    data: trajets,
                }),
            );
        });
    });

    describe("getTrajetById", () => {
        it("devrait retourner un trajet par son ID", async () => {
            const trajet = { _id: "trajet-123" };

            const { req, res, next } = createMocks({
                params: { id: "trajet-123" },
            });

            trajetService.getTrajetById.mockResolvedValue(trajet);

            await getTrajetById(req, res, next);

            expect(trajetService.getTrajetById).toHaveBeenCalledWith(
                req.params.id,
                req.user,
            );

            expect(res.status).toHaveBeenCalledWith(200);

            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    success: true,
                    data: trajet,
                }),
            );
        });
        it("devrait retourner 404 si le trajet est introuvable", async () => {
            const { req, res, next } = createMocks({
                params: { id: "trajet-123" },
            });

            trajetService.getTrajetById.mockResolvedValue(null);

            await getTrajetById(req, res, next);

            expect(trajetService.getTrajetById).toHaveBeenCalledWith(
                req.params.id,
                req.user,
            );

            expect(res.status).toHaveBeenCalledWith(404);

            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    success: false,
                    message: "Trajet introuvable",
                })
            );

            expect(next).not.toHaveBeenCalled();
        });
    });

    describe("updateTrajet", () => {
        it("devrait modifier un trajet et retourner 200", async () => {
            const body = {
                statut: "EN_COURS",
                kilometrageDepart: 150000,
            };

            const trajet = {
                _id: "trajet-123",
                ...body,
            };

            const { req, res, next } = createMocks({
                params: { id: "trajet-123" },
                body,
            });

            trajetService.updateTrajet.mockResolvedValue(trajet);

            await updateTrajet(req, res, next);

            expect(trajetService.updateTrajet).toHaveBeenCalledWith(
                req.params.id,
                req.body,
                req.user,
            );

            expect(res.status).toHaveBeenCalledWith(200);

            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    success: true,
                    data: trajet,
                }),
            );
        });

        it("devrait retourner 404 si le trajet est introuvable", async () => {
            const body = {
                statut: "EN_COURS",
                kilometrageDepart: 150000,
            };

            const { req, res, next } = createMocks({
                params: { id: "trajet-123" },
                body,
            });

            trajetService.updateTrajet.mockResolvedValue(null);

            await updateTrajet(req, res, next);

            expect(trajetService.updateTrajet).toHaveBeenCalledWith(
                req.params.id,
                req.body,
                req.user,
            );

            expect(res.status).toHaveBeenCalledWith(404);

            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    success: false,
                    message: "Trajet introuvable",
                })
            );

            expect(next).not.toHaveBeenCalled();
        });
    });

    describe("deleteTrajet", () => {
        it("devrait supprimer un trajet et retourner 200", async () => {
            const { req, res, next } = createMocks({
                params: { id: "trajet-123" },
            });

            trajetService.deleteTrajet.mockResolvedValue({
                _id: "trajet-123",
            });

            await deleteTrajet(req, res, next);

            expect(trajetService.deleteTrajet).toHaveBeenCalledWith(req.params.id);

            expect(res.status).toHaveBeenCalledWith(200);

            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    success: true,
                }),
            );
        });

        it("devrait retourner 404 si le trajet est introuvable", async () => {
            const { req, res, next } = createMocks({
                params: { id: "trajet-123" },
            });

            trajetService.deleteTrajet.mockResolvedValue(null);

            await deleteTrajet(req, res, next);

            expect(trajetService.deleteTrajet).toHaveBeenCalledWith(req.params.id);

            expect(res.status).toHaveBeenCalledWith(404);

            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    success: false,
                    message: "Trajet introuvable",
                })
            );

            expect(next).not.toHaveBeenCalled();
        });
    });
});
