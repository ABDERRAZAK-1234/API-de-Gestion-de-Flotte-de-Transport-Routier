const Camion = require("../models/Camion");

const create = (data) => Camion.create(data);

const findAll = () => Camion.find();

const findById = (id) => Camion.findById(id);

const update = (id, data) =>
    Camion.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    });

const remove = (id) => Camion.findByIdAndDelete(id);

module.exports = {
    create,
    findAll,
    findById,
    update,
    remove
};