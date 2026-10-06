const MaintenanceRule = require("../models/MaintenanceRule");

const create = async (data) => {
    return await MaintenanceRule.create(data);
};

const findAll = async () => {
    return await MaintenanceRule.find();
};

const findById = async (id) => {
    return await MaintenanceRule.findById(id);
};

const update = async (id, data) => {
    return await MaintenanceRule.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true
        }
    );
};

const remove = async (id) => {
    return await MaintenanceRule.findByIdAndDelete(id);
};

module.exports = {
    create,
    findAll,
    findById,
    update,
    remove
};