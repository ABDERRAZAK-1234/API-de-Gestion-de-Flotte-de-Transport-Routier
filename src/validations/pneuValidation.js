const Joi = require("joi");

const createPneuSchema = Joi.object({
    camion: Joi.string()
        .hex()
        .length(24)
        .required()
        .messages({
            "string.base": "L'identifiant du camion doit être une chaîne de caractères",
            "string.hex": "L'identifiant du camion doit être un ObjectId MongoDB valide",
            "string.length": "L'identifiant du camion doit contenir 24 caractères",
            "any.required": "Le camion est obligatoire"
        }),

    reference: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required()
        .messages({
            "string.base": "La référence doit être une chaîne de caractères",
            "string.empty": "La référence est obligatoire",
            "string.min": "La référence doit contenir au moins 2 caractères",
            "string.max": "La référence ne doit pas dépasser 100 caractères",
            "any.required": "La référence est obligatoire"
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

    position: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .required()
        .messages({
            "string.base": "La position doit être une chaîne de caractères",
            "string.empty": "La position est obligatoire",
            "string.min": "La position doit contenir au moins 2 caractères",
            "string.max": "La position ne doit pas dépasser 50 caractères",
            "any.required": "La position est obligatoire"
        }),

    kilometrageInstallation: Joi.number()
        .min(0)
        .required()
        .messages({
            "number.base": "Le kilométrage d'installation doit être un nombre",
            "number.min": "Le kilométrage d'installation ne peut pas être négatif",
            "any.required": "Le kilométrage d'installation est obligatoire"
        }),

    kilometrageUsure: Joi.number()
        .min(0)
        .messages({
            "number.base": "Le kilométrage d'usure doit être un nombre",
            "number.min": "Le kilométrage d'usure ne peut pas être négatif"
        }),

    seuilUsure: Joi.number()
        .min(0)
        .required()
        .messages({
            "number.base": "Le seuil d'usure doit être un nombre",
            "number.min": "Le seuil d'usure ne peut pas être négatif",
            "any.required": "Le seuil d'usure est obligatoire"
        }),

    etat: Joi.string()
        .valid(
            "BON",
            "USE",
            "A_REMPLACER"
        )
        .messages({
            "string.base": "L'état doit être une chaîne de caractères",
            "any.only": "L'état doit être BON, USE ou A_REMPLACER"
        })
});

const updatePneuSchema = createPneuSchema.fork(
    Object.keys(createPneuSchema.describe().keys),
    (schema) => schema.optional()
);

module.exports = {
    createPneuSchema,
    updatePneuSchema
};