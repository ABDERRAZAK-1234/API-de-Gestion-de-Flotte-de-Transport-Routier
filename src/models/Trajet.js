const mongoose = require("mongoose");

const trajetSchema = new mongoose.Schema(
    {
        chauffeur: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        camion: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Camion",
            required: true
        },

        remorque: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Remorque",
            required: true
        },

        lieuDepart: {
            type: String,
            required: true,
            trim: true
        },

        lieuArrivee: {
            type: String,
            required: true,
            trim: true
        },

        marchandise: {
            type: String,
            required: true,
            trim: true
        },

        dateDepartPrevue: {
            type: Date,
            required: true
        },

        dateArriveePrevue: {
            type: Date,
            required: true
        },

        dateDepartReelle: {
            type: Date,
            default: null
        },

        dateArriveeReelle: {
            type: Date,
            default: null
        },

        statut: {
            type: String,
            enum: [
                "A_FAIRE",
                "EN_COURS",
                "TERMINE"
            ],
            default: "A_FAIRE"
        },

        kilometrageDepart: {
            type: Number,
            min: 0,
            default: null
        },

        kilometrageArrivee: {
            type: Number,
            min: 0,
            default: null
        },

        volumeGasoil: {
            type: Number,
            min: 0,
            default: 0
        },

        consommation: {
            type: Number,
            min: 0,
            default: 0
        },

        remarque: {
            type: String,
            trim: true,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Trajet", trajetSchema);