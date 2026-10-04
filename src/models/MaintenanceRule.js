const mongoose = require("mongoose");

const maintenanceRuleSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: [
                "PNEU",
                "VIDANGE",
                "REVISION"
            ],
            required: true
        },

        seuilKilometrage: {
            type: Number,
            required: true,
            min: 0
        },

        active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "MaintenanceRule",
    maintenanceRuleSchema
);