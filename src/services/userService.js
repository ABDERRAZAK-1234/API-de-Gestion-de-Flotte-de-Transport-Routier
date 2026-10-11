
const userRepository = require("../repositories/userRepository");

const createError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

const ensureCanManageUser = (currentUser, targetUser) => {
    if (String(currentUser.id) === String(targetUser._id)) {
        throw createError(
            "Vous ne pouvez pas gérer votre propre compte depuis cette opération",
            403
        );
    }

    const allowedRoles = {
        SUPER_ADMIN: ["ADMIN", "CHAUFFEUR"],
        ADMIN: ["CHAUFFEUR"]
    };

    const rolesAutorises = allowedRoles[currentUser.role] || [];

    if (!rolesAutorises.includes(targetUser.role)) {
        throw createError(
            "Vous n'avez pas la permission de gérer ce compte",
            403
        );
    }
};

const getAllUsers = async (currentUser) => {
    if (currentUser.role === "SUPER_ADMIN") {
        return await userRepository.findAll({
            role: { $in: ["ADMIN", "CHAUFFEUR"] }
        });
    }

    if (currentUser.role === "ADMIN") {
        return await userRepository.findAll({
            role: "CHAUFFEUR"
        });
    }

    throw createError("Accès refusé", 403);
};

const getUserById = async (id, currentUser) => {
    const user = await userRepository.findById(id);

    if (!user) {
        throw createError("Utilisateur introuvable", 404);
    }

    ensureCanManageUser(currentUser, user);

    return user;
};

const updateUser = async (id, data, currentUser) => {
    const user = await userRepository.findById(id);

    if (!user) {
        throw createError("Utilisateur introuvable", 404);
    }

    ensureCanManageUser(currentUser, user);

    const allowedFields = ["nom", "prenom", "email"];

    const updateData = Object.fromEntries(
        Object.entries(data).filter(([field]) =>
            allowedFields.includes(field)
        )
    );

    if (Object.keys(updateData).length === 0) {
        throw createError(
            "Aucune donnée valide à modifier",
            400
        );
    }

    if (updateData.email) {
        updateData.email = updateData.email.toLowerCase();

        const existingUser = await userRepository.findByEmail(
            updateData.email
        );

        if (
            existingUser &&
            String(existingUser._id) !== String(user._id)
        ) {
            throw createError(
                "Cette adresse email est déjà utilisée",
                409
            );
        }
    }

    return await userRepository.update(id, updateData);
};

const validateUser = async (id, currentUser) => {
    const user = await userRepository.findById(id);

    if (!user) {
        throw createError("Utilisateur introuvable", 404);
    }

    ensureCanManageUser(currentUser, user);

    if (user.statut !== "EN_ATTENTE" || user.isValidated) {
        throw createError(
            "Ce compte n'est pas en attente de validation",
            409
        );
    }

    return await userRepository.update(id, {
        isValidated: true,
        statut: "ACTIF"
    });
};

const suspendUser = async (id, currentUser) => {
    const user = await userRepository.findById(id);

    if (!user) {
        throw createError("Utilisateur introuvable", 404);
    }

    ensureCanManageUser(currentUser, user);

    if (user.statut !== "ACTIF") {
        throw createError(
            "Seul un compte actif peut être suspendu",
            409
        );
    }

    return await userRepository.update(id, {
        statut: "SUSPENDU"
    });
};

const reactivateUser = async (id, currentUser) => {
    const user = await userRepository.findById(id);

    if (!user) {
        throw createError("Utilisateur introuvable", 404);
    }

    ensureCanManageUser(currentUser, user);

    if (
        user.statut !== "SUSPENDU" ||
        !user.isValidated
    ) {
        throw createError(
            "Ce compte ne peut pas être réactivé",
            409
        );
    }

    return await userRepository.update(id, {
        statut: "ACTIF"
    });
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    validateUser,
    suspendUser,
    reactivateUser
};
