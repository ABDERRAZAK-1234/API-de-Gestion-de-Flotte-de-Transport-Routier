const Joi = require("joi");

const objectId = Joi.string()
    .hex()
    .length(24);

const createMaintenanceSchema = Joi.object({
    camion: objectId
        .allow(null)
        .messages({
            "string.base": "L'identifiant du camion doit être une chaîne de caractères",
            "string.hex": "L'identifiant du camion doit être un ObjectId MongoDB valide",
            "string.length": "L'identifiant du camion doit contenir 24 caractères"
        }),

    remorque: objectId
        .allow(null)
        .messages({
            "string.base": "L'identifiant de la remorque doit être une chaîne de caractères",
            "string.hex": "L'identifiant de la remorque doit être un ObjectId MongoDB valide",
            "string.length": "L'identifiant de la remorque doit contenir 24 caractères"
        }),

    type: Joi.string()
        .valid(
            "PNEU",
            "VIDANGE",
            "REVISION"
        )
        .required()
        .messages({
            "string.base": "Le type doit être une chaîne de caractères",
            "any.only": "Le type doit être PNEU, VIDANGE ou REVISION",
            "any.required": "Le type de maintenance est obligatoire"
        }),

    date: Joi.date()
        .required()
        .messages({
            "date.base": "La date de maintenance est invalide",
            "any.required": "La date de maintenance est obligatoire"
        }),

    kilometrage: Joi.number()
        .min(0)
        .required()
        .messages({
            "number.base": "Le kilométrage doit être un nombre",
            "number.min": "Le kilométrage ne peut pas être négatif",
            "any.required": "Le kilométrage est obligatoire"
        }),

    description: Joi.string()
        .trim()
        .max(500)
        .allow("")
        .messages({
            "string.base": "La description doit être une chaîne de caractères",
            "string.max": "La description ne doit pas dépasser 500 caractères"
        }),

    statut: Joi.string()
        .valid(
            "EN_ATTENTE",
            "EN_COURS",
            "TERMINEE"
        )
        .messages({
            "string.base": "Le statut doit être une chaîne de caractères",
            "any.only": "Le statut doit être EN_ATTENTE, EN_COURS ou TERMINEE"
        })
});

const updateMaintenanceSchema = createMaintenanceSchema.fork(
    Object.keys(createMaintenanceSchema.describe().keys),
    (schema) => schema.optional()   
);

module.exports = {
    createMaintenanceSchema,
    updateMaintenanceSchema
};