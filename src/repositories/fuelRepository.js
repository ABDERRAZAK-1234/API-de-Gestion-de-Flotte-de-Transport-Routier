const Fuel = require("../models/Fuel");

const create = async (data) => {
    return await Fuel.create(data);
};

const findAll = async () => {
    return await Fuel.find()
        .populate("trajet");
};

const findById = async (id) => {
    return await Fuel.findById(id)
        .populate("trajet");
};

const update = async (id, data) => {
    return await Fuel.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true
        }
    ).populate("trajet");
};

const remove = async (id) => {
    return await Fuel.findByIdAndDelete(id);
};

module.exports = {
    create,
    findAll,
    findById,
    update,
    remove
};