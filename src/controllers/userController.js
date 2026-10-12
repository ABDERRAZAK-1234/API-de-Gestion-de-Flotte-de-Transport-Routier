
const userService = require("../services/userService");

const pending = async (req, res, next) => {
    try {
        const users = await userService.getPendingUsers(req.user);

        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        next(error);
    }
};

const validate = async (req, res, next) => {
    try {
        const user = await userService.validateUser(
            req.params.id,
            req.user
        );

        res.status(200).json({
            success: true,
            message: "Utilisateur validé avec succès",
            data: user
        });
    } catch (error) {
        next(error);
    }
};

const reject = async (req, res, next) => {
    try {
        const user = await userService.rejectUser(
            req.params.id,
            req.user
        );

        res.status(200).json({
            success: true,
            message: "Utilisateur rejeté avec succès",
            data: user
        });
    } catch (error) {
        next(error);
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers(req.user);

        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const user = await userService.getUserById(
            req.params.id,
            req.user
        );

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const user = await userService.updateUser(
            req.params.id,
            req.body,
            req.user
        );

        res.status(200).json({
            success: true,
            message: "Utilisateur modifié avec succès",
            data: user
        });
    } catch (error) {
        next(error);
    }
};

const suspend = async (req, res, next) => {
    try {
        const user = await userService.suspendUser(
            req.params.id,
            req.user
        );

        res.status(200).json({
            success: true,
            message: "Utilisateur suspendu avec succès",
            data: user
        });
    } catch (error) {
        next(error);
    }
};

const reactivate = async (req, res, next) => {
    try {
        const user = await userService.reactivateUser(
            req.params.id,
            req.user
        );

        res.status(200).json({
            success: true,
            message: "Utilisateur réactivé avec succès",
            data: user
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    pending,
    validate,
    reject,
    getAllUsers,
    getUserById,
    updateUser,
    suspend,
    reactivate
};