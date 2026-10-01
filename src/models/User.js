const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: [true, "Le nom est required"],
        trim: true
    },
    prenom: {
        type: String,
        required: [true, "Le prenom est required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "L'email est required"],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ["ADMIN", "CHAUFFEUR"]
    },
    statut: {
        type: String,
        enum: ["ACTIF", "SUSPENDU"],
        default: "ACTIF"
    }
},
    {
        timestamps: true
    }

);

module.exports = mongoose.Schema("User",userSchema);