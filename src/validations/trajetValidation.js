const Joi = require("joi");

const objectId = Joi.string()
    .hex()
    .length(24);

const createTrajetSchema = Joi.object({
    chauffeur: objectId
        .required()
        .messages({
            "string.base": "L'identifiant du chauffeur doit être une chaîne de caractères",
            "string.hex": "L'identifiant du chauffeur doit être un ObjectId MongoDB valide",
            "string.length": "L'identifiant du chauffeur doit contenir 24 caractères",
            "any.required": "Le chauffeur est obligatoire"
        }),

    camion: objectId
        .required()
        .messages({
            "string.base": "L'identifiant du camion doit être une chaîne de caractères",
            "string.hex": "L'identifiant du camion doit être un ObjectId MongoDB valide",
            "string.length": "L'identifiant du camion doit contenir 24 caractères",
            "any.required": "Le camion est obligatoire"
        }),

    remorque: objectId
        .required()
        .messages({
            "string.base": "L'identifiant de la remorque doit être une chaîne de caractères",
            "string.hex": "L'identifiant de la remorque doit être un ObjectId MongoDB valide",
            "string.length": "L'identifiant de la remorque doit contenir 24 caractères",
            "any.required": "La remorque est obligatoire"
        }),

    lieuDepart: Joi.string()
        .trim()
        .min(2)
        .max(200)
        .required()
        .messages({
            "string.base": "Le lieu de départ doit être une chaîne de caractères",
            "string.empty": "Le lieu de départ est obligatoire",
            "string.min": "Le lieu de départ doit contenir au moins 2 caractères",
            "string.max": "Le lieu de départ ne doit pas dépasser 200 caractères",
            "any.required": "Le lieu de départ est obligatoire"
        }),

    lieuArrivee: Joi.string()
        .trim()
        .min(2)
        .max(200)
        .required()
        .messages({
            "string.base": "Le lieu d'arrivée doit être une chaîne de caractères",
            "string.empty": "Le lieu d'arrivée est obligatoire",
            "string.min": "Le lieu d'arrivée doit contenir au moins 2 caractères",
            "string.max": "Le lieu d'arrivée ne doit pas dépasser 200 caractères",
            "any.required": "Le lieu d'arrivée est obligatoire"
        }),

    marchandise: Joi.string()
        .trim()
        .min(2)
        .max(200)
        .required()
        .messages({
            "string.base": "La marchandise doit être une chaîne de caractères",
            "string.empty": "La marchandise est obligatoire",
            "string.min": "La marchandise doit contenir au moins 2 caractères",
            "string.max": "La marchandise ne doit pas dépasser 200 caractères",
            "any.required": "La marchandise est obligatoire"
        }),

    dateDepartPrevue: Joi.date()
        .required()
        .messages({
            "date.base": "La date de départ prévue est invalide",
            "any.required": "La date de départ prévue est obligatoire"
        }),

    dateArriveePrevue: Joi.date()
        .required()
        .messages({
            "date.base": "La date d'arrivée prévue est invalide",
            "any.required": "La date d'arrivée prévue est obligatoire"
        }),

    dateDepartReelle: Joi.date()
        .allow(null)
        .messages({
            "date.base": "La date de départ réelle est invalide"
        }),

    dateArriveeReelle: Joi.date()
        .allow(null)
        .messages({
            "date.base": "La date d'arrivée réelle est invalide"
        }),

    statut: Joi.string()
        .valid(
            "A_FAIRE",
            "EN_COURS",
            "TERMINE"
        )
        .messages({
            "string.base": "Le statut doit être une chaîne de caractères",
            "any.only": "Le statut doit être A_FAIRE, EN_COURS ou TERMINE"
        }),

    kilometrageDepart: Joi.number()
        .min(0)
        .allow(null)
        .messages({
            "number.base": "Le kilométrage de départ doit être un nombre",
            "number.min": "Le kilométrage de départ ne peut pas être négatif"
        }),

    kilometrageArrivee: Joi.number()
        .min(0)
        .allow(null)
        .messages({
            "number.base": "Le kilométrage d'arrivée doit être un nombre",
            "number.min": "Le kilométrage d'arrivée ne peut pas être négatif"
        }),

    volumeGasoil: Joi.number()
        .min(0)
        .messages({
            "number.base": "Le volume de gasoil doit être un nombre",
            "number.min": "Le volume de gasoil ne peut pas être négatif"
        }),

    consommation: Joi.number()
        .min(0)
        .messages({
            "number.base": "La consommation doit être un nombre",
            "number.min": "La consommation ne peut pas être négative"
        }),

    remarque: Joi.string()
        .trim()
        .max(500)
        .allow("")
        .messages({
            "string.base": "La remarque doit être une chaîne de caractères",
            "string.max": "La remarque ne doit pas dépasser 500 caractères"
        })
});

const updateTrajetSchema = createTrajetSchema.fork(
    Object.keys(createTrajetSchema.describe().keys),
    (schema) => schema.optional()
);

module.exports = {
    createTrajetSchema,
    updateTrajetSchema
};