const camionRepository = require("../repositories/camionRepository");

const createCamion = async (data) => {
    return await camionRepository.create(data);
};

const getAllCamions = async () => {
    return await camionRepository.findAll();
};

const getCamionById = async (id) => {
    return await camionRepository.findById(id);
};

const updateCamion = async (id, data) => {
    return await camionRepository.update(id, data);
};

const deleteCamion = async (id) => {
    return await camionRepository.remove(id);
};

module.exports = {
    createCamion,
    getAllCamions,
    getCamionById,
    updateCamion,
    deleteCamion
};