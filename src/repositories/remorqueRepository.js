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

const remove = async (id) => {
    return await Remorque.findByIdAndDelete(id);
};

module.exports = {
    create,
    findAll,
    findById,
    update,
    remove
};