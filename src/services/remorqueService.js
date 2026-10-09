const remorqueRepository = require("../repositories/remorqueRepository");

const createRemorque = async (data) => {
    const existingRemorque =
        await remorqueRepository.findByImmatriculation(
            data.immatriculation
        );

    if (existingRemorque) {
        const error = new Error(
            "Cette immatriculation existe déjà"
        );

        error.statusCode = 409;
        throw error;
    }

    return await remorqueRepository.create(data);
};

const getAllRemorques = async () => {
    return await remorqueRepository.findAll();
};

const getRemorqueById = async (id) => {
    return await remorqueRepository.findById(id);
};

const updateRemorque = async (id, data) => {
    const existingRemorque =
        await remorqueRepository.findById(id);

    if (!existingRemorque) {
        const error = new Error("Remorque introuvable");

        error.statusCode = 404;
        throw error;
    }

    if (
        data.immatriculation &&
        data.immatriculation !== existingRemorque.immatriculation
    ) {
        const duplicate =
            await remorqueRepository.findByImmatriculation(
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

    return await remorqueRepository.update(id, data);
};

// archive remorque
const deleteRemorque = async (id) => {
    const existingRemorque =
        await remorqueRepository.findById(id);

    if (!existingRemorque) {
        const error = new Error("Remorque introuvable");

        error.statusCode = 404;
        throw error;
    }

    return await remorqueRepository.archive(id);
};

module.exports = {
    createRemorque,
    getAllRemorques,
    getRemorqueById,
    updateRemorque,
    deleteRemorque
};