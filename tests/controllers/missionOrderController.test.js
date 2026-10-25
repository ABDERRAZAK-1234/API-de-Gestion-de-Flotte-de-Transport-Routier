jest.mock("../../src/services/missionOrderService", () => ({
    getMissionOrderUrl: jest.fn(),
}));

const missionOrderService = require("../../src/services/missionOrderService");
const {
    getMissionOrderUrl,
} = require("../../src/controllers/missionOrderController");
const {
    createMocks,
    runNextErrorCase,
} = require("../helpers/controllerTestUtils");

describe("MissionOrderController", () => {
    beforeEach(() => jest.clearAllMocks());

    it("devrait retourner l'URL de l'ordre de mission", async () => {
        const data = {
            url: "http://localhost:9000/fleettrack-documents/order.pdf?signature=example",
            filename: "ordre-mission-trajet-123.pdf",
            expiresIn: 900,
            expiresAt: "2026-10-23T12:00:00.000Z",
        };
        const user = { id: "driver-123", role: "CHAUFFEUR" };
        const { req, res, next } = createMocks({
            params: { id: "trajet-123" },
            user,
        });
        missionOrderService.getMissionOrderUrl.mockResolvedValue(data);

        await getMissionOrderUrl(req, res, next);

        expect(missionOrderService.getMissionOrderUrl).toHaveBeenCalledWith({
            trajetId: req.params.id,
            user: req.user,
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: "Ordre de mission prêt au téléchargement",
            data,
        });
        expect(next).not.toHaveBeenCalled();
    });

    it("devrait transmettre l'erreur au middleware", async () => {
        await runNextErrorCase({
            controller: getMissionOrderUrl,
            service: missionOrderService,
            method: "getMissionOrderUrl",
            request: {
                params: { id: "trajet-123" },
                user: { id: "driver-123", role: "CHAUFFEUR" },
            },
            args: (req) => [{ trajetId: req.params.id, user: req.user }],
        });
    });
});
