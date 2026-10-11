const User = require("../models/User");

const findAll = async (filter = {}) => {
    return await User.find(filter)
        .select("-password")
        .sort({ createdAt: -1 });
};

const findById = async (id) => {
    return await User.findById(id)
        .select(
            "_id nom prenom email role statut isValidated createdAt updatedAt"
        );
};

const findByEmail = async (email) => {
    return await User.findOne({
        email: email.toLowerCase()
    }).select("_id email role statut isValidated");
};

const update = async (id, data) => {
    return await User.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true
        }
    ).select("-password");
};

module.exports = {
    findAll,
    findById,
    findByEmail,
    update
};