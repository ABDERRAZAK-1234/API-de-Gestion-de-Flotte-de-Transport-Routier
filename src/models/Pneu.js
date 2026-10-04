const mongoose = require("mongoose");

const pneuSchema = new mongoose.Schema(
    {
        camion: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Camion",
            required: true
        },

        reference: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        marque: {
            type: String,
            required: true,
            trim: true
        },

        position: {
            type: String,
            required: true,
            trim: true
        },

        kilometrageInstallation: {
            type: Number,
            required: true,
            min: 0
        },

        kilometrageUsure: {
            type: Number,
            default: 0,
            min: 0
        },

        seuilUsure: {
            type: Number,
            required: true,
            min: 0
        },

        etat: {
            type: String,
            enum: [
                "BON",
                "USE",
                "A_REMPLACER"
            ],
            default: "BON"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Pneu", pneuSchema);