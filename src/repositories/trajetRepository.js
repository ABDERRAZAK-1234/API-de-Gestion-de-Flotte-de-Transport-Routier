const Trajet = require("../models/Trajet");

const populateRelations = (query) => {
  return query
    .populate("chauffeur", "nom prenom email role statut")
    .populate("camion")
    .populate("remorque");
};

const create = async (data) => {
  return await Trajet.create(data);
};

const findAll = async () => {
  return await populateRelations(Trajet.find());
};

const findById = async (id) => {
  return await populateRelations(Trajet.findById(id));
};

const findByIdForMissionOrder = async (id) => {
  return Trajet.findById(id)
    .populate("chauffeur", "nom prenom email")
    .populate("camion", "immatriculation marque modele")
    .populate("remorque");
};

const saveMissionOrderMetadata = async (id, metadata) => {
  return Trajet.findByIdAndUpdate(
    id,
    {
      $set: {
        ordreMission: metadata,
      },
    },
    {
      new: true,
      runValidators: true,
    },
  );
};

const findByChauffeur = async (chauffeurId) => {
  return await populateRelations(Trajet.find({ chauffeur: chauffeurId }));
};

const findOverlappingByResource = async ({
  field,
  resourceId,
  dateDepartPrevue,
  dateArriveePrevue,
  excludeTrajetId,
}) => {
  const filter = {
    [field]: resourceId,

    statut: {
      $in: ["A_FAIRE", "EN_COURS"],
    },

    dateDepartPrevue: {
      $lt: dateArriveePrevue,
    },

    dateArriveePrevue: {
      $gt: dateDepartPrevue,
    },
  };

  if (excludeTrajetId) {
    filter._id = { $ne: excludeTrajetId };
  }

  return await Trajet.findOne(filter);
};

const update = async (id, data) => {
  return await populateRelations(
    Trajet.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }),
  );
};

const remove = async (id) => {
  return await Trajet.findByIdAndDelete(id);
};

module.exports = {
  create,
  findAll,
  findById,
  findByChauffeur,
  findOverlappingByResource,
  update,
  remove,
  findByIdForMissionOrder,
  saveMissionOrderMetadata,
};
