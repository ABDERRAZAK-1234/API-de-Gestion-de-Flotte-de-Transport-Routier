const trajetRepository = require("../repositories/trajetRepository");
const camionRepository = require("../repositories/camionRepository");
const remorqueRepository = require("../repositories/remorqueRepository");
const availabilityService = require("./availabilityService");

const createError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

const getReferenceId = (reference) => {
    return String(reference?._id ?? reference);
};

const isAdmin = (user) => {
    return ["ADMIN", "SUPER_ADMIN"].includes(user?.role);
};

const createTrajet = async (data) => {
    await availabilityService.verifierDisponibilite(data);

    const trajetData = {
        chauffeur: data.chauffeur,
        camion: data.camion,
        remorque: data.remorque,
        lieuDepart: data.lieuDepart,
        lieuArrivee: data.lieuArrivee,
        marchandise: data.marchandise,
        dateDepartPrevue: data.dateDepartPrevue,
        dateArriveePrevue: data.dateArriveePrevue,
        statut: "A_FAIRE",
        dateDepartReelle: null,
        dateArriveeReelle: null,
        kilometrageDepart: null,
        kilometrageArrivee: null,
        volumeGasoil: 0,
        consommation: 0,
        remarque: data.remarque || ""
    };

    return await trajetRepository.create(trajetData);
};

const getAllTrajets = async (currentUser) => {
    if (currentUser.role === "CHAUFFEUR") {
        return await trajetRepository.findByChauffeur(currentUser.id);
    }

    return await trajetRepository.findAll();
};

const getTrajetById = async (id, currentUser) => {
    const trajet = await trajetRepository.findById(id);

    if (!trajet) {
        throw createError("Trajet introuvable", 404);
    }

    if (
        currentUser.role === "CHAUFFEUR" &&
        getReferenceId(trajet.chauffeur) !== String(currentUser.id)
    ) {
        throw createError(
            "Vous ne pouvez consulter que vos propres trajets",
            403
        );
    }

    return trajet;
};

const updateTrajet = async (id, data, currentUser) => {
    const trajet = await trajetRepository.findById(id);

    if (!trajet) {
        throw createError("Trajet introuvable", 404);
    }

    const admin = isAdmin(currentUser);
    const chauffeurConnecte = currentUser.role === "CHAUFFEUR";

    if (
        chauffeurConnecte &&
        getReferenceId(trajet.chauffeur) !== String(currentUser.id)
    ) {
        throw createError(
            "Vous ne pouvez modifier que vos propres trajets",
            403
        );
    }

    const champsAutorisesChauffeur = [
        "statut",
        "kilometrageDepart",
        "kilometrageArrivee",
        "volumeGasoil",
        "remarque"
    ];

    if (chauffeurConnecte) {
        const champsInterdits = Object.keys(data).filter(
            (field) => !champsAutorisesChauffeur.includes(field)
        );

        if (champsInterdits.length > 0) {
            throw createError(
                "Vous ne pouvez modifier que le statut, les kilométrages, le volume de gasoil et la remarque",
                403
            );
        }
    }

    const champsAffectation = [
        "chauffeur",
        "camion",
        "remorque",
        "dateDepartPrevue",
        "dateArriveePrevue"
    ];

    const affectationModifiee = champsAffectation.some(
        (field) => data[field] !== undefined
    );

    const affectation = {
        chauffeur: data.chauffeur ?? getReferenceId(trajet.chauffeur),
        camion: data.camion ?? getReferenceId(trajet.camion),
        remorque: data.remorque ?? getReferenceId(trajet.remorque),
        dateDepartPrevue:
            data.dateDepartPrevue ?? trajet.dateDepartPrevue,
        dateArriveePrevue:
            data.dateArriveePrevue ?? trajet.dateArriveePrevue,
        excludeTrajetId: id
    };

    if (affectationModifiee) {
        if (trajet.statut === "TERMINE") {
            throw createError(
                "Un trajet terminé ne peut plus être réaffecté",
                400
            );
        }

        await availabilityService.verifierDisponibilite(affectation);
    }

    const ordreStatuts = ["A_FAIRE", "EN_COURS", "TERMINE"];
    const nouveauStatut = data.statut ?? trajet.statut;

    if (!ordreStatuts.includes(nouveauStatut)) {
        throw createError("Statut de trajet invalide", 400);
    }

    const ancienIndex = ordreStatuts.indexOf(trajet.statut);
    const nouveauIndex = ordreStatuts.indexOf(nouveauStatut);

    if (nouveauIndex > ancienIndex + 1) {
        throw createError(
            "La transition doit respecter l'ordre A_FAIRE → EN_COURS → TERMINE",
            400
        );
    }

    if (nouveauIndex < ancienIndex && !admin) {
        throw createError(
            "Seul un administrateur peut revenir à un statut précédent",
            403
        );
    }

    const kilometrageDepart =
        data.kilometrageDepart ?? trajet.kilometrageDepart;

    const kilometrageArrivee =
        data.kilometrageArrivee ?? trajet.kilometrageArrivee;

    if (
        nouveauStatut === "EN_COURS" &&
        trajet.statut !== "EN_COURS" &&
        kilometrageDepart == null
    ) {
        throw createError(
            "Le kilométrage de départ est obligatoire pour démarrer le trajet",
            400
        );
    }

    if (
        kilometrageDepart != null &&
        kilometrageArrivee != null &&
        kilometrageArrivee <= kilometrageDepart
    ) {
        throw createError(
            "Le kilométrage d'arrivée doit être strictement supérieur au kilométrage de départ",
            400
        );
    }

    if (
        nouveauStatut === "TERMINE" &&
        (kilometrageDepart == null || kilometrageArrivee == null)
    ) {
        throw createError(
            "Les kilométrages de départ et d'arrivée sont obligatoires pour terminer le trajet",
            400
        );
    }

    if (
        nouveauStatut === "EN_COURS" &&
        trajet.statut !== "EN_COURS"
    ) {
        await availabilityService.verifierDisponibilite({
            ...affectation,
            excludeTrajetId: id
        });
    }

    const updateData = { ...data };

    // Les dates réelles et la consommation sont contrôlées par le serveur.
    delete updateData.dateDepartReelle;
    delete updateData.dateArriveeReelle;
    delete updateData.consommation;

    if (
        nouveauStatut === "EN_COURS" &&
        trajet.statut !== "EN_COURS"
    ) {
        updateData.dateDepartReelle = new Date();
    }

    if (
        nouveauStatut === "TERMINE" &&
        trajet.statut !== "TERMINE"
    ) {
        updateData.dateArriveeReelle = new Date();

        const distance = kilometrageArrivee - kilometrageDepart;
        const volumeGasoil = data.volumeGasoil ?? trajet.volumeGasoil ?? 0;

        updateData.consommation = Number(
            ((volumeGasoil / distance) * 100).toFixed(2)
        );
    }

    const trajetModifie = await trajetRepository.update(id, updateData);

    if (
        nouveauStatut === "EN_COURS" &&
        trajet.statut !== "EN_COURS"
    ) {
        await Promise.all([
            camionRepository.update(affectation.camion, {
                statut: "EN_SERVICE"
            }),
            remorqueRepository.update(affectation.remorque, {
                statut: "EN_SERVICE"
            })
        ]);
    }

    if (
        nouveauStatut === "TERMINE" &&
        trajet.statut !== "TERMINE"
    ) {
        const distance = kilometrageArrivee - kilometrageDepart;

        await Promise.all([
            camionRepository.update(affectation.camion, {
                statut: "DISPONIBLE",
                kilometrage: kilometrageArrivee
            }),
            remorqueRepository.update(affectation.remorque, {
                statut: "DISPONIBLE",
                kilometrage:
                    (trajet.remorque.kilometrage || 0) + distance
            })
        ]);
    }

    return trajetModifie;
};

const deleteTrajet = async (id) => {
    const trajet = await trajetRepository.findById(id);

    if (!trajet) {
        throw createError("Trajet introuvable", 404);
    }

    return await trajetRepository.remove(id);
};

module.exports = {
    createTrajet,
    getAllTrajets,
    getTrajetById,
    updateTrajet,
    deleteTrajet
};