const fuelRepository = require("../repositories/fuelRepository");

const createFuel = async (data) => {
    return await fuelRepository.create(data);
};

const getAllFuels = async () => {
    return await fuelRepository.findAll();
};

const getFuelById = async (id) => {
    return await fuelRepository.findById(id);
};

const updateFuel = async (id, data) => {
    return await fuelRepository.update(id, data);
};

const deleteFuel = async (id) => {
    return await fuelRepository.remove(id);
};

module.exports = {
    createFuel,
    getAllFuels,
    getFuelById,
    updateFuel,
    deleteFuel
};