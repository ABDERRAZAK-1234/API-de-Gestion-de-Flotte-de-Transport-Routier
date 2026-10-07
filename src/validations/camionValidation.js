const Joi = require("joi");

const createCamionSchema = Joi.object({
    nom: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required()
        .messages({
            "string.base": "Le nom doit être une chaîne de caractères",
            "string.empty": "Le nom est obligatoire",
            "string.min": "Le nom doit contenir au moins 2 caractères",
            "string.max": "Le nom ne doit pas dépasser 100 caractères",
            "any.required": "Le nom est obligatoire"
        }),

    marque: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .required()
        .messages({
            "string.base": "La marque doit être une chaîne de caractères",
            "string.empty": "La marque est obligatoire",
            "string.min": "La marque doit contenir au moins 2 caractères",
            "string.max": "La marque ne doit pas dépasser 50 caractères",
            "any.required": "La marque est obligatoire"
        }),

    immatriculation: Joi.string()
        .trim()
        .uppercase()
        .required()
        .messages({
            "string.base": "L'immatriculation doit être une chaîne de caractères",
            "string.empty": "L'immatriculation est obligatoire",
            "any.required": "L'immatriculation est obligatoire"
        }),

    modele: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .required()
        .messages({
            "string.base": "Le modèle doit être une chaîne de caractères",
            "string.empty": "Le modèle est obligatoire",
            "string.min": "Le modèle doit contenir au moins 1 caractère",
            "string.max": "Le modèle ne doit pas dépasser 100 caractères",
            "any.required": "Le modèle est obligatoire"
        }),

    kilometrage: Joi.number()
        .min(0)
        .required()
        .messages({
            "number.base": "Le kilométrage doit être un nombre",
            "number.min": "Le kilométrage ne peut pas être négatif",
            "any.required": "Le kilométrage est obligatoire"
        }),

    statut: Joi.string()
        .valid(
            "DISPONIBLE",
            "EN_SERVICE",
            "MAINTENANCE",
            "ARCHIVE"
        )
        .messages({
            "string.base": "Le statut doit être une chaîne de caractères",
            "any.only": "Le statut doit être DISPONIBLE, EN_SERVICE, MAINTENANCE ou ARCHIVE"
        }),

    dateMiseEnService: Joi.date()
        .required()
        .messages({
            "date.base": "La date de mise en service est invalide",
            "any.required": "La date de mise en service est obligatoire"
        })
});

const updateCamionSchema = createCamionSchema.fork(
    Object.keys(createCamionSchema.describe().keys),
    (schema) => schema.optional()
);

module.exports = {
    createCamionSchema,
    updateCamionSchema
};