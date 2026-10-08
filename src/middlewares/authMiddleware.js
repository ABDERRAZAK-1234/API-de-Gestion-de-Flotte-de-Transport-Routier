const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
    try {
        const header = req.headers.authorization;
        if (!header || !header.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Token manquant"
            });
        }

        const token = header.split(" ")[1];

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            const message = err.name === "TokenExpiredError" ? "Token expiré" : "Token invalide";
            return res.status(401).json({
                success: false,
                message
            });
        }

        const user = await User.findById(decoded.id).select("_id role statut");
        if (!user || user.statut !== "ACTIF") {
            return res.status(403).json({
                success: false,
                message: "Compte non autorisé"
            });
        }

        req.user = { id: user._id, role: user.role };
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Accès refusé : rôle non autorisé"
            });
        }
        next();
    };
};

module.exports = {
    authenticate,
    authorize
};