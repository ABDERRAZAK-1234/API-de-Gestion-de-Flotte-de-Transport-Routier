jest.mock("../../src/repositories/fuelRepository", () => ({
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
}));

const fuelRepository = require("../../src/repositories/fuelRepository");
const fuelService = require("../../src/services/fuelService");

describe("FuelService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("createFuel", () => {
        it("devrait créer un fuel", async () => {
            const data = {
                trajet: "trajet-123",
                volume: 120,
                prix: 1800,
                kilometrage: 150000,
            };

            const fuel = {
                _id: "fuel-123",
                ...data,
            };

            fuelRepository.create.mockResolvedValue(fuel);

            const result = await fuelService.createFuel(data);

            expect(fuelRepository.create).toHaveBeenCalledWith(data);

            expect(result).toBe(fuel);
        });
    });
});