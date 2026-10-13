const Joi = require("joi");

const updateUserSchema = Joi.object({
    nom: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .messages({
            "string.base": "Le nom doit être une chaîne de caractères",
            "string.empty": "Le nom ne peut pas être vide",
            "string.min": "Le nom doit contenir au moins 2 caractères",
            "string.max": "Le nom ne doit pas dépasser 50 caractères"
        }),

    prenom: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .messages({
            "string.base": "Le prénom doit être une chaîne de caractères",
            "string.empty": "Le prénom ne peut pas être vide",
            "string.min": "Le prénom doit contenir au moins 2 caractères",
            "string.max": "Le prénom ne doit pas dépasser 50 caractères"
        }),

    email: Joi.string()
        .trim()
        .lowercase()
        .email()
        .messages({
            "string.base": "L'email doit être une chaîne de caractères",
            "string.email": "L'adresse email est invalide",
            "string.empty": "L'email ne peut pas être vide"
        })
})
    .min(1)
    .messages({
        "object.min": "Au moins un champ doit être fourni"
    });

module.exports = {
    updateUserSchema
};