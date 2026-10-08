const camionRepository = require("../repositories/camionRepository");

const createCamion = async (data) => {
    const existingCamion =
        await camionRepository.findByImmatriculation(
            data.immatriculation
        );

    if (existingCamion) {
        const error = new Error(
            "Cette immatriculation existe déjà"
        );

        error.statusCode = 409;

        throw error;
    }

    return await camionRepository.create(data);
};

const getAllCamions = async () => {
    return await camionRepository.findAll();
};

const getCamionById = async (id) => {
    return await camionRepository.findById(id);
};

const updateCamion = async (id, data) => {
    const existingCamion =
        await camionRepository.findById(id);

    if (!existingCamion) {
        const error = new Error("Camion introuvable");
        error.statusCode = 404;

        throw error;
    }

    if (
        data.immatriculation &&
        data.immatriculation !== existingCamion.immatriculation
    ) {
        const duplicate =
            await camionRepository.findByImmatriculation(
                data.immatriculation
            );

        if (duplicate) {
            const error = new Error(
                "Cette immatriculation existe déjà"
            );

            error.statusCode = 409;

            throw error;
        }
    }

    return await camionRepository.update(id, data);
};

const archiveCamion = async (id) => {
    const existingCamion =
        await camionRepository.findById(id);

    if (!existingCamion) {
        const error = new Error("Camion introuvable");
        error.statusCode = 404;

        throw error;
    }

    return await camionRepository.archive(id);
};

module.exports = {
    createCamion,
    getAllCamions,
    getCamionById,
    updateCamion,
    archiveCamion
};