const Maintenance = require("../models/Maintenance");

const create = async (data) => {
    return await Maintenance.create(data);
};

const findAll = async () => {
    return await Maintenance.find()
        .populate("camion",)
        .populate("remorque");
};

const findById = async (id) => {
    return await Maintenance.findById(id)
        .populate("camion")
        .populate("remorque");
};

const update = async (id, data) => {
    return await Maintenance.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true
        }
    )
        .populate("camion")
        .populate("remorque");
};

const remove = async (id) => {
    return await Maintenance.findByIdAndDelete(id);
};

module.exports = {
    create,
    findAll,
    findById,
    update,
    remove
};