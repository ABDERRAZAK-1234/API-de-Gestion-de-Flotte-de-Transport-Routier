const maintenanceRepository = require("../repositories/maintenanceRepository");

const createMaintenance = async (data) => {
    return await maintenanceRepository.create(data);
};

const getAllMaintenances = async () => {
    return await maintenanceRepository.findAll();
};

const getMaintenanceById = async (id) => {
    return await maintenanceRepository.findById(id);
};

const updateMaintenance = async (id, data) => {
    return await maintenanceRepository.update(id, data);
};

const deleteMaintenance = async (id) => {
    return await maintenanceRepository.remove(id);
};

module.exports = {
    createMaintenance,
    getAllMaintenances,
    getMaintenanceById,
    updateMaintenance,
    deleteMaintenance
};