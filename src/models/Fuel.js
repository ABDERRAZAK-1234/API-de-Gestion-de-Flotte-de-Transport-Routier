const mongoose = require("mongoose");

const fuelSchema = new mongoose.Schema(
    {
        trajet: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Trajet",
            required: true
        },

        volume: {
            type: Number,
            required: true,
            min: 0
        },

        prix: {
            type: Number,
            required: true,
            min: 0
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
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Fuel", fuelSchema);