
const Fuel = require("../models/Fuel");
const Trajet = require("../models/Trajet");

const getTripsFinancialEsg = async ({ startDate, endDate } = {}) => {

    const dateFilter = {};

    if (startDate) {
        dateFilter.$gte = startDate;
    }

    if (endDate) {
        dateFilter.$lte = endDate;
    }

    const match = {
        volume: {
            $type: "number",
            $gte: 0
        },
        prix: {
            $type: "number",
            $gte: 0
        }
    };

    if (Object.keys(dateFilter).length > 0) {
        match.date = dateFilter;
    }

    return Fuel.aggregate([

        {
            $match: match
        },


        {
            $lookup: {
                from: Trajet.collection.name,
                localField: "trajet",
                foreignField: "_id",
                as: "trajetDetails"
            }
        },

        {
            $unwind: "$trajetDetails"
        },


        {
            $group: {
                _id: {
                    lieuDepart: "$trajetDetails.lieuDepart",
                    lieuArrivee: "$trajetDetails.lieuArrivee"
                },

                totalLitres: {
                    $sum: "$volume"
                },

                coutCarburantMAD: {
                    $sum: "$prix"
                },

                nombreRavitaillements: {
                    $sum: 1
                },

                trajetsIds: {
                    $addToSet: "$trajet"
                }
            }
        },


        {
            $addFields: {
                nombreTrajets: {
                    $size: "$trajetsIds"
                },

                emissionsCO2Kg: {
                    $multiply: ["$totalLitres", 2.68]
                },

                emissionsCO2Tonnes: {
                    $divide: [
                        {
                            $multiply: ["$totalLitres", 2.68]
                        },
                        1000
                    ]
                }
            }
        },


        {
            $project: {
                _id: 0,

                trajet: {
                    $concat: [
                        "$_id.lieuDepart",
                        " -> ",
                        "$_id.lieuArrivee"
                    ]
                },

                nombreTrajets: 1,
                nombreRavitaillements: 1,

                totalLitres: {
                    $round: ["$totalLitres", 2]
                },

                coutCarburantMAD: {
                    $round: ["$coutCarburantMAD", 2]
                },

                emissionsCO2Kg: {
                    $round: ["$emissionsCO2Kg", 2]
                },

                emissionsCO2Tonnes: {
                    $round: ["$emissionsCO2Tonnes", 4]
                }
            }
        },


        {
            $sort: {
                lieuDepart: 1,
                lieuArrivee: 1
            }
        }
    ]);
};

module.exports = {
    getTripsFinancialEsg
};
