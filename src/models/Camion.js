const mongoose = require("mongoose");

const camionSchema = new mongoose.Schema(
    {
        nom: {
            type: String,
            required: true,
            trim: true
        },

        marque: {
            type: String,
            required: true,
            trim: true
        },

        immatriculation: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true
        },

        modele: {
            type: String,
            required: true,
            trim: true
        },

        kilometrage: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        },

        statut: {
            type: String,
            enum: [
                "DISPONIBLE",
                "EN_SERVICE",
                "MAINTENANCE",
                "ARCHIVE"
            ],
            default: "DISPONIBLE"
        },

        dateMiseEnService: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Camion", camionSchema);