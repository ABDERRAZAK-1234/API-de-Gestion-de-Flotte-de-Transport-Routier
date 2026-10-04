const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema(
    {
        camion: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Camion",
            default: null
        },

        remorque: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Remorque",
            default: null
        },

        type: {
            type: String,
            enum: [
                "PNEU",
                "VIDANGE",
                "REVISION"
            ],
            required: true
        },

        date: {
            type: Date,
            required: true,
            default: Date.now
        },

        kilometrage: {
            type: Number,
            required: true,
            min: 0
        },

        description: {
            type: String,
            trim: true,
            default: ""
        },

        statut: {
            type: String,
            enum: [
                "EN_ATTENTE",
                "EN_COURS",
                "TERMINEE"
            ],
            default: "EN_ATTENTE"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Maintenance", maintenanceSchema);