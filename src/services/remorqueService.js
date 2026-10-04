const remorqueRepository = require("../repositories/remorqueRepository");

const createRemorque = async (data) => {
    return await remorqueRepository.create(data);
};

const getAllRemorques = async () => {
    return await remorqueRepository.findAll();
};

const getRemorqueById = async (id) => {
    return await remorqueRepository.findById(id);
};

const updateRemorque = async (id, data) => {
    return await remorqueRepository.update(id, data);
};

const deleteRemorque = async (id) => {
    return await remorqueRepository.remove(id);
};

module.exports = {
    createRemorque,
    getAllRemorques,
    getRemorqueById,
    updateRemorque,
    deleteRemorque
};