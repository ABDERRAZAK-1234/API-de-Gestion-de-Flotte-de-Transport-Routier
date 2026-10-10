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

const findOpenByCamion = async (camionId) => {
    return await Maintenance.findOne({
        camion: camionId,
        statut: {
            $in: ["EN_ATTENTE", "EN_COURS"]
        }
    });
};

const findOpenByRemorque = async (remorqueId) => {
    return await Maintenance.findOne({
        remorque: remorqueId,
        statut: {
            $in: ["EN_ATTENTE", "EN_COURS"]
        }
    });
};

module.exports = {
    create,
    findAll,
    findById,
    update,
    remove,
    findOpenByCamion,
    findOpenByRemorque
};