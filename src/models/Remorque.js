const mongoose = require("mongoose");

const remorqueSchema = new mongoose.Schema(
    {
        immatriculation: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true
        },

        type: {
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
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Remorque", remorqueSchema);