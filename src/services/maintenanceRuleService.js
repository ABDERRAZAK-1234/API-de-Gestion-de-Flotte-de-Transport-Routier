const maintenanceRuleRepository = require("../repositories/maintenanceRuleRepository");
const maintenanceRepository = require("../repositories/maintenanceRepository");
const camionRepository = require("../repositories/camionRepository");
const remorqueRepository = require("../repositories/remorqueRepository");

const createError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

const verifierAlertesVehicule = async (
    typeVehicule,
    vehiculeId
) => {
    const repositories = {
        camion: camionRepository,
        remorque: remorqueRepository
    };

    const repository = repositories[typeVehicule];

    if (!repository) {
        throw createError("Type de véhicule invalide", 400);
    }

    const vehicule = await repository.findById(vehiculeId);

    if (!vehicule) {
        throw createError("Véhicule introuvable", 404);
    }

    if (vehicule.statut === "ARCHIVE") {
        return [];
    }

    const rules = await maintenanceRuleRepository.findActive();
    const alertesCreees = [];

    for (const rule of rules) {
        const derniereMaintenance =
            await maintenanceRepository.findLatestCompletedByTargetAndType(
                typeVehicule,
                vehicule._id,
                rule.type
            );

        const kilometrageReference =
            derniereMaintenance
                ? derniereMaintenance.kilometrage
                : 0;

        const kilometrageDepuisMaintenance =
            vehicule.kilometrage - kilometrageReference;

        if (kilometrageDepuisMaintenance <= rule.seuilKilometrage) {
            continue;
        }

        const alerteExistante =
            await maintenanceRepository.findOpenByTargetAndType(
                typeVehicule,
                vehicule._id,
                rule.type
            );

        if (alerteExistante) {
            continue;
        }

        const alerte = await maintenanceRepository.create({
            [typeVehicule]: vehicule._id,
            type: rule.type,
            date: new Date(),
            kilometrage: vehicule.kilometrage,
            description:
                `Alerte automatique : seuil de ${rule.seuilKilometrage} km dépassé. ` +
                `${kilometrageDepuisMaintenance} km parcourus depuis la dernière maintenance.`,
            statut: "EN_ATTENTE"
        });

        alertesCreees.push(alerte);
    }

    return alertesCreees;
};

const verifierToutesLesAlertes = async () => {
    const [camions, remorques] = await Promise.all([
        camionRepository.findAll(),
        remorqueRepository.findAll()
    ]);

    for (const camion of camions) {
        await verifierAlertesVehicule("camion", camion._id);
    }

    for (const remorque of remorques) {
        await verifierAlertesVehicule("remorque", remorque._id);
    }
};

const createMaintenanceRule = async (data) => {
    const rule = await maintenanceRuleRepository.create(data);

    if (rule.active) {
        await verifierToutesLesAlertes();
    }

    return rule;
};

const getAllMaintenanceRules = async () => {
    return await maintenanceRuleRepository.findAll();
};

const getMaintenanceRuleById = async (id) => {
    return await maintenanceRuleRepository.findById(id);
};

const updateMaintenanceRule = async (id, data) => {
    const rule = await maintenanceRuleRepository.update(id, data);

    if (rule && rule.active) {
        await verifierToutesLesAlertes();
    }

    return rule;
};

const deleteMaintenanceRule = async (id) => {
    return await maintenanceRuleRepository.remove(id);
};

module.exports = {
    createMaintenanceRule,
    getAllMaintenanceRules,
    getMaintenanceRuleById,
    updateMaintenanceRule,
    deleteMaintenanceRule,
    verifierAlertesVehicule,
    verifierToutesLesAlertes
};