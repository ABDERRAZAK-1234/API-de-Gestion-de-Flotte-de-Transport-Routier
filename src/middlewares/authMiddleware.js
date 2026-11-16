
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticate = async (req, res, next) => {
    try {
        // 1. Get token from Cookie or Authorization Header
        const authHeader = req.headers.authorization;

        const token =
            req.cookies?.token ||
            (authHeader?.startsWith("Bearer ")
                ? authHeader.split(" ")[1]
                : null);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token manquant"
            });
        }

        // 2. Verifie JWT
        let decoded;

        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            const message =
                err.name === "TokenExpiredError"
                    ? "Token expiré"
                    : "Token invalide";

            return res.status(401).json({
                success: false,
                message
            });
        }

        // 3. Find user
        const user = await User.findById(decoded.id)
            .select("_id nom prenom email role statut");

        if (!user || user.statut !== "ACTIF") {
            return res.status(403).json({
                success: false,
                message: "Compte non autorisé"
            });
        }

        // 4. Attach user to request
        req.user = {
            id: user._id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            role: user.role
        };

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
