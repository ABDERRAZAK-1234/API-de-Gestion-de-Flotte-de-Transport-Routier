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

        res.cookie("token", data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 8 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                user: data.user
            }
        });

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
        });
    }
};

const me = async (req, res) => {
    return res.status(200).json({
        success: true,
        data: {
            user: req.user
        }
    });
};

const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/"
    });

    return res.status(200).json({
        success: true,
        message: "Logout successful"
    });
};


module.exports = {
    register,
    login,
    me,
    logout
}