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


const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
};


const login = async ({ email, password }) => {
    if (!email || !password) {
        throw new Error("Email and password are required", 400);
    }
    const user = await User.findOne({ email: email.toLowerCase().trim() });

    const isMatch = user && await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid email or password", 401);
    }

    if (user.statut === "EN_ATTENTE") throw new Error("Account pending validation", 403);
    if (user.statut === "REJETE") throw new Error("Registration rejected", 403);
    if (user.statut === "SUSPENDU") throw new Error("Account suspended", 403);

    const token = generateToken(user);

    return {
        user: {
            id: user._id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            role: user.role,
            statut: user.statut
        },
        token
    };
}


module.exports = {
    register,
    login
}