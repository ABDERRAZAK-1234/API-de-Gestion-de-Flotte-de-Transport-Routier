const User = require("../models/User");

const findById = async (id) => {
    return await User.findById(id).select(
        "_id role statut isValidated"
    );
};

module.exports = {
    findById
};