const Joi = require("joi");

const createMaintenanceRuleSchema = Joi.object({
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

    seuilKilometrage: Joi.number()
        .min(0)
        .required()
        .messages({
            "number.base": "Le seuil de kilométrage doit être un nombre",
            "number.min": "Le seuil de kilométrage ne peut pas être négatif",
            "any.required": "Le seuil de kilométrage est obligatoire"
        }),

    active: Joi.boolean()
        .messages({
            "boolean.base": "Le champ active doit être un booléen"
        })
});

const updateMaintenanceRuleSchema = createMaintenanceRuleSchema.fork(
    Object.keys(createMaintenanceRuleSchema.describe().keys),
    (schema) => schema.optional()
);

module.exports = {
    createMaintenanceRuleSchema,
    updateMaintenanceRuleSchema
};