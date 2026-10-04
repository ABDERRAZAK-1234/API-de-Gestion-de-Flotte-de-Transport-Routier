const trajetRepository = require("../repositories/trajetRepository");

const createTrajet = async (data) => {
    return await trajetRepository.create(data);
};

const getAllTrajets = async () => {
    return await trajetRepository.findAll();
};

const getTrajetById = async (id) => {
    return await trajetRepository.findById(id);
};

const updateTrajet = async (id, data) => {
    return await trajetRepository.update(id, data);
};

const deleteTrajet = async (id) => {
    return await trajetRepository.remove(id);
};

module.exports = {
    createTrajet,
    getAllTrajets,
    getTrajetById,
    updateTrajet,
    deleteTrajet
};