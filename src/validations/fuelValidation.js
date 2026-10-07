const Joi = require("joi");

const createFuelSchema = Joi.object({
    trajet: Joi.string()
        .hex()
        .length(24)
        .required()
        .messages({
            "string.base": "L'identifiant du trajet doit être une chaîne de caractères",
            "string.hex": "L'identifiant du trajet doit être un ObjectId MongoDB valide",
            "string.length": "L'identifiant du trajet doit contenir 24 caractères",
            "any.required": "Le trajet est obligatoire"
        }),

    volume: Joi.number()
        .positive()
        .required()
        .messages({
            "number.base": "Le volume doit être un nombre",
            "number.positive": "Le volume doit être supérieur à 0",
            "any.required": "Le volume est obligatoire"
        }),

    prix: Joi.number()
        .min(0)
        .required()
        .messages({
            "number.base": "Le prix doit être un nombre",
            "number.min": "Le prix ne peut pas être négatif",
            "any.required": "Le prix est obligatoire"
        }),

    date: Joi.date()
        .required()
        .messages({
            "date.base": "La date du carburant est invalide",
            "any.required": "La date du carburant est obligatoire"
        }),

    kilometrage: Joi.number()
        .min(0)
        .required()
        .messages({
            "number.base": "Le kilométrage doit être un nombre",
            "number.min": "Le kilométrage ne peut pas être négatif",
            "any.required": "Le kilométrage est obligatoire"
        })
});

const updateFuelSchema = createFuelSchema.fork(
    Object.keys(createFuelSchema.describe().keys),
    (schema) => schema.optional()
);

module.exports = {
    createFuelSchema,
    updateFuelSchema
};