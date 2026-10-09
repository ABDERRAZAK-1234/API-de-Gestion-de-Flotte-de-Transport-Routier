const Remorque = require("../models/Remorque");

const create = async (data) => {
    return await Remorque.create(data);
};

const findAll = async () => {
    return await Remorque.find();
};

const findById = async (id) => {
    return await Remorque.findById(id);
};

const findByImmatriculation = async (immatriculation) => {
    return await Remorque.findOne({ immatriculation });
};

const update = async (id, data) => {
    return await Remorque.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true
        }
    );
};

const archive = async (id) => {
    return await Remorque.findByIdAndUpdate(
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