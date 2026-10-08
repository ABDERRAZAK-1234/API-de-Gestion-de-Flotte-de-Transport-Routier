const pneuRepository = require("../repositories/pneuRepository");
const camionRepository = require("../repositories/camionRepository");

const createPneu = async (data) => {

    const camion = await camionRepository.findById(data.camion);

    if (!camion) {
        const error = new Error("Camion introuvable");
        error.statusCode = 404;
        throw error;
    }

    const nombrePneus = await pneuRepository.countByCamion(data.camion);

    if (nombrePneus >= 6) {
        const error = new Error(
            "Ce camion possède déjà 6 pneus"
        );
        error.statusCode = 400;
        throw error;
    }

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