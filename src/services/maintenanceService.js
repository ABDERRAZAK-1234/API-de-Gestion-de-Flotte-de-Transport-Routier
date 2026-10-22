
const maintenanceRepository = require("../repositories/maintenanceRepository");

const createError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

const createMaintenance = async (data) => {

    const maintenanceData = {
        ...data,
        statut: "EN_ATTENTE",
        dateDebut: null,
        dateFin: null
    };

    return maintenanceRepository.create(maintenanceData);
};

const getAllMaintenances = async () => {
    return maintenanceRepository.findAll();
};

const getMaintenanceById = async (id) => {
    return maintenanceRepository.findById(id);
};

const updateMaintenance = async (id, data) => {
    const maintenance = await maintenanceRepository.findById(id);

    if (!maintenance) {
        throw createError("Maintenance introuvable", 404);
    }

    const updateData = { ...data };


    delete updateData.dateDebut;
    delete updateData.dateFin;

    const statuts = [
        "EN_ATTENTE",
        "EN_COURS",
        "TERMINEE"
    ];

    const ancienStatut = maintenance.statut;
    const nouveauStatut = data.statut ?? ancienStatut;

    const ancienIndex = statuts.indexOf(ancienStatut);
    const nouveauIndex = statuts.indexOf(nouveauStatut);

    if (nouveauIndex === -1) {
        throw createError("Statut de maintenance invalide", 400);
    }

    if (nouveauIndex > ancienIndex + 1) {
        throw createError(
            "La transition doit respecter l'ordre EN_ATTENTE → EN_COURS → TERMINEE",
            400
        );
    }

    if (nouveauIndex < ancienIndex) {
        throw createError(
            "Une maintenance ne peut pas revenir à un statut précédent",
            400
        );
    }

    if (
        ancienStatut === "EN_ATTENTE" &&
        nouveauStatut === "EN_COURS"
    ) {
        updateData.dateDebut = new Date();
    }


    if (
        ancienStatut === "EN_COURS" &&
        nouveauStatut === "TERMINEE"
    ) {
        updateData.dateFin = new Date();
    }

    return maintenanceRepository.update(id, updateData);
};

const deleteMaintenance = async (id) => {
    const maintenance = await maintenanceRepository.findById(id);

    if (!maintenance) {
        throw createError("Maintenance introuvable", 404);
    }

    return maintenanceRepository.remove(id);
};

module.exports = {
    createMaintenance,
    getAllMaintenances,
    getMaintenanceById,
    updateMaintenance,
    deleteMaintenance
};
