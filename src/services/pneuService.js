const pneuRepository = require("../repositories/pneuRepository");

const createPneu = async (data) => {
    return await pneuRepository.create(data);
};

const getAllPneus = async () => {
    return await pneuRepository.findAll();
};

const getPneuById = async (id) => {
    return await pneuRepository.findById(id);
};

const updatePneu = async (id, data) => {
    return await pneuRepository.update(id, data);
};

const deletePneu = async (id) => {
    return await pneuRepository.remove(id);
};

module.exports = {
    createPneu,
    getAllPneus,
    getPneuById,
    updatePneu,
    deletePneu
};