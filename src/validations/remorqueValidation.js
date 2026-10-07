const Joi = require("joi");

const createRemorqueSchema = Joi.object({
    immatriculation: Joi.string()
        .trim()
        .uppercase()
        .required()
        .messages({
            "string.base": "L'immatriculation doit être une chaîne de caractères",
            "string.empty": "L'immatriculation est obligatoire",
            "any.required": "L'immatriculation est obligatoire"
        }),

    type: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .required()
        .messages({
            "string.base": "Le type doit être une chaîne de caractères",
            "string.empty": "Le type est obligatoire",
            "string.min": "Le type doit contenir au moins 2 caractères",
            "string.max": "Le type ne doit pas dépasser 50 caractères",
            "any.required": "Le type est obligatoire"
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
        })
});

const updateRemorqueSchema = createRemorqueSchema.fork(
    Object.keys(createRemorqueSchema.describe().keys),
    (schema) => schema.optional()
);

module.exports = {
    createRemorqueSchema,
    updateRemorqueSchema
};