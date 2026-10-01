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
        unique: [true, "email deja exist"],
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Le password est required"],
        minlength: [6, "Le password doit contenir au moins 6 caractères"]
    },
    role: {
        type: String,
        enum: ["SUPER_ADMIN", "ADMIN", "CHAUFFEUR"],
        required: true
    },
    isValidated: {
        type: Boolean,
        default: false
    },
    statut: {
        type: String,
        enum: ["EN_ATTENTE", "ACTIF", "REJETE", "SUSPENDU"],
        default: "EN_ATTENTE"
    },
    validatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    validatedAt: {
        type: Date
    }
},
    {
        timestamps: true
    }

);

module.exports = mongoose.model("User", userSchema);