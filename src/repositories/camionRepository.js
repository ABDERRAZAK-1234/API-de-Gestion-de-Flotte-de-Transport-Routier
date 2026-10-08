const Camion = require("../models/Camion");

const create = async (data) => {
    return await Camion.create(data);
};

const findAll = async () => {
    return await Camion.find();
};

const findById = async (id) => {
    return await Camion.findById(id);
};

const findByImmatriculation = async (immatriculation) => {
    return await Camion.findOne({ immatriculation });
};

const update = async (id, data) => {
    return await Camion.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true
        }
    );
};

const archive = async (id) => {
    return await Camion.findByIdAndUpdate(
        id,
        { statut: "ARCHIVE" },
        {
            new: true,
            runValidators: true
        }
    );
};

module.exports = {
    create,
    findAll,
    findById,
    findByImmatriculation,
    update,
    archive
};