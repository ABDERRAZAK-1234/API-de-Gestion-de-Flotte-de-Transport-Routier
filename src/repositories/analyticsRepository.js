
const Trajet = require("../models/Trajet");

const getDriversEcoPerformance = async () => {
    return Trajet.aggregate([
        {
            $match: {
                statut: "TERMINE",
                kilometrageDepart: { $type: "number" },
                kilometrageArrivee: { $type: "number" },
                volumeGasoil: { $type: "number", $gt: 0 }
            }
        },
        
        {
            $addFields: {
                distanceKm: {
                    $subtract: [
                        "$kilometrageArrivee",
                        "$kilometrageDepart"
                    ]
                },
                litresConsommes: "$volumeGasoil"
            }
        },

        {
            $match: {
                distanceKm: { $gt: 0 }
            }
        },

        {
            $group: {
                _id: "$chauffeur",

                totalGasoil: {
                    $sum: "$litresConsommes"
                },

                distanceTotale: {
                    $sum: "$distanceKm"
                },

                nombreTrajets: {
                    $sum: 1
                }
            }
        },

        {
            $match: {
                totalGasoil: { $gt: 0 },
                distanceTotale: { $gt: 0 }
            }
        },

        {
            $addFields: {
                consommationMoyenne: {
                    $multiply: [
                        {
                            $divide: [
                                "$totalGasoil",
                                "$distanceTotale"
                            ]
                        },
                        100
                    ]
                }
            }
        },

        {
            $addFields: {
                scoreEco: {
                    $max: [
                        0,
                        {
                            $min: [
                                100,
                                {
                                    $subtract: [
                                        100,
                                        {
                                            $multiply: [
                                                {
                                                    $subtract: [
                                                        "$consommationMoyenne",
                                                        30
                                                    ]
                                                },
                                                2.5
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        },

        {
            $lookup: {
                from: "users",
                localField: "_id",
                foreignField: "_id",
                as: "chauffeur"
            }
        },

        {
            $unwind: "$chauffeur"
        },

        {
            $match: {
                "chauffeur.role": "CHAUFFEUR"
            }
        },

        {
            $project: {
                _id: 0,

                chauffeurId: "$_id",
                nom: "$chauffeur.nom",
                prenom: "$chauffeur.prenom",

                nombreTrajetsTermines: "$nombreTrajets",

                totalGasoilLitres: {
                    $round: ["$totalGasoil", 2]
                },

                distanceTotaleKm: {
                    $round: ["$distanceTotale", 2]
                },

                consommationMoyenneL100Km: {
                    $round: ["$consommationMoyenne", 2]
                },

                scoreEcoConduite: {
                    $round: ["$scoreEco", 2]
                }
            }
        },

        {
            $sort: {
                scoreEcoConduite: -1
            }
        }
    ]);
};

module.exports = {
    getDriversEcoPerformance
};
