const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async ({ nom, prenom, email, password, role }) => {

    // verfie role
    if (!["ADMIN", "CHAUFFEUR"].includes(role)) {
        throw new Error("Le role doit etre admin ou chauffeur");
    }

    // verifie if email is existe
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("Un utilisateur avec cet email existe déjà");
    }

    // hash pwd
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        nom,
        prenom,
        email,
        password: hashedPassword,
        role,
        isValidated: false,
        statut: "EN_ATTENTE"
    });

    return {
        id: user._id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role,
        isValidated: user.isValidated,
        statut: user.statut
    };

};


module.exports = {
    register
}