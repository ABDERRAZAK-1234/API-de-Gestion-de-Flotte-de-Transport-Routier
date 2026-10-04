const Trajet = require("../models/Trajet");

const create = async (data) => {
    return await Trajet.create(data);
};

const findAll = async () => {
    return await Trajet.find()
        .populate("chauffeur")
        .populate("camion")
        .populate("remorque");
};

const findById = async (id) => {
    return await Trajet.findById(id)
        .populate("chauffeur")
        .populate("camion")
        .populate("remorque");
};

const update = async (id, data) => {
    return await Trajet.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true
        }
    )
        .populate("chauffeur")
        .populate("camion")
        .populate("remorque");
};

const remove = async (id) => {
    return await Trajet.findByIdAndDelete(id);
};

module.exports = {
    create,
    findAll,
    findById,
    update,
    remove
};