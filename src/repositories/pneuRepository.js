const Pneu = require("../models/Pneu");

const create = async (data) => {
    return await Pneu.create(data);
};

const findAll = async () => {
    return await Pneu.find()
        .populate("camion","nom marque immatriculation");
};

const findById = async (id) => {
    return await Pneu.findById(id)
        .populate("camion","nom marque immatriculation");
};

const update = async (id, data) => {
    return await Pneu.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true
        }
    ).populate("camion","nom marque immatriculation");
};

const remove = async (id) => {
    return await Pneu.findByIdAndDelete(id);
};

module.exports = {
    create,
    findAll,
    findById,
    update,
    remove
};