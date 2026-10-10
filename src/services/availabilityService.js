const userRepository = require("../repositories/userRepository");
const camionRepository = require("../repositories/camionRepository");
const remorqueRepository = require("../repositories/remorqueRepository");
const pneuRepository = require("../repositories/pneuRepository");
const maintenanceRepository = require("../repositories/maintenanceRepository");
const trajetRepository = require("../repositories/trajetRepository");

const createError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

const verifierDisponibilite = async ({
    chauffeur,
    camion,
    remorque,
    dateDepartPrevue,
    dateArriveePrevue,
    excludeTrajetId
}) => {
    const debut = new Date(dateDepartPrevue);
    const fin = new Date(dateArriveePrevue);

    if (
        Number.isNaN(debut.getTime()) ||
        Number.isNaN(fin.getTime()) ||
        fin <= debut
    ) {
        throw createError(
            "La date d'arrivée prévue doit être postérieure à la date de départ",
            400
        );
    }

    const [user, camionExiste, remorqueExiste] = await Promise.all([
        userRepository.findById(chauffeur),
        camionRepository.findById(camion),
        remorqueRepository.findById(remorque)
    ]);

    if (!user) {
        throw createError("Chauffeur introuvable", 404);
    }

    if (
        user.role !== "CHAUFFEUR" ||
        user.statut !== "ACTIF" ||
        !user.isValidated
    ) {
        throw createError(
            "Le chauffeur n'est pas autorisé à effectuer ce trajet",
            409
        );
    }

    if (!camionExiste) {
        throw createError("Camion introuvable", 404);
    }

    if (!remorqueExiste) {
        throw createError("Remorque introuvable", 404);
    }

    if (["MAINTENANCE", "ARCHIVE"].includes(camionExiste.statut)) {
        throw createError(
            "Le camion n'est pas disponible pour un trajet",
            409
        );
    }

    if (["MAINTENANCE", "ARCHIVE"].includes(remorqueExiste.statut)) {
        throw createError(
            "La remorque n'est pas disponible pour un trajet",
            409
        );
    }

    // Verifier les maintenances non termines
    const [maintenanceCamion, maintenanceRemorque] = await Promise.all([
        maintenanceRepository.findOpenByCamion(camion),
        maintenanceRepository.findOpenByRemorque(remorque)
    ]);

    if (maintenanceCamion) {
        throw createError(
            "Le camion possède une maintenance non terminée",
            409
        );
    }

    if (maintenanceRemorque) {
        throw createError(
            "La remorque possède une maintenance non terminée",
            409
        );
    }

    // Vérifier les pneus du camion
    const pneus = await pneuRepository.findByCamion(camion);

    const pneuAremplacer = pneus.find((pneu) =>
        pneu.etat === "A_REMPLACER" ||
        pneu.kilometrageUsure > pneu.seuilUsure
    );

    if (pneuAremplacer) {
        throw createError(
            "Un pneu a dépassé son seuil d'usure. Remplacement requis avant l'assignation",
            409
        );
    }

    // Vérifier les chevauchements pour chaque ressource
    const ressources = [
        {
            field: "camion",
            resourceId: camion,
            message: "Ce camion est déjà affecté à un trajet sur cette période"
        },
        {
            field: "remorque",
            resourceId: remorque,
            message: "Cette remorque est déjà affectée à un trajet sur cette période"
        },
        {
            field: "chauffeur",
            resourceId: chauffeur,
            message: "Ce chauffeur possède déjà un trajet sur cette période"
        }
    ];

    for (const ressource of ressources) {
        const conflit = await trajetRepository.findOverlappingByResource({
            field: ressource.field,
            resourceId: ressource.resourceId,
            dateDepartPrevue: debut,
            dateArriveePrevue: fin,
            excludeTrajetId
        });

        if (conflit) {
            throw createError(ressource.message, 409);
        }
    }

    return true;
};

module.exports = {
    verifierDisponibilite
};