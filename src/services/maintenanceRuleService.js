const maintenanceRuleRepository = require("../repositories/maintenanceRuleRepository");

const createMaintenanceRule = async (data) => {
    return await maintenanceRuleRepository.create(data);
};

const getAllMaintenanceRules = async () => {
    return await maintenanceRuleRepository.findAll();
};

const getMaintenanceRuleById = async (id) => {
    return await maintenanceRuleRepository.findById(id);
};

const updateMaintenanceRule = async (id, data) => {
    return await maintenanceRuleRepository.update(id, data);
};

const deleteMaintenanceRule = async (id) => {
    return await maintenanceRuleRepository.remove(id);
};

module.exports = {
    createMaintenanceRule,
    getAllMaintenanceRules,
    getMaintenanceRuleById,
    updateMaintenanceRule,
    deleteMaintenanceRule
};