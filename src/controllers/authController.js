const authService = require("../services/authService");

const register = async (req, res) => {
    try {

        const user = await authService.register(req.body);

        return res.status(201).json({
            success: true,
            message: "Compte crée, En attente de validation de l'admin",
            data: user
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const login = async (req, res) => {
    try {
        const data = await authService.login(req.body);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
        });
    }

}


module.exports = {
    register,
    login
}