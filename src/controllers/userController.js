
const userService = require("../services/userService");

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

const validateUser = async (req, res, next) => {
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

const suspendUser = async (req, res, next) => {
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

const reactivateUser = async (req, res, next) => {
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
    getAllUsers,
    getUserById,
    updateUser,
    validateUser,
    suspendUser,
    reactivateUser
};