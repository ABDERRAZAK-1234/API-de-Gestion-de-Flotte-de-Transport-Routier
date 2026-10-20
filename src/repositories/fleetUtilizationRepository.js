
const Camion = require("../models/Camion");
const Trajet = require("../models/Trajet");
const Maintenance = require("../models/Maintenance");

const getFleetUtilizationTrends = async ({ months = 12 } = {}) => {
    const numberOfMonths = Number(months);

    if (
        !Number.isInteger(numberOfMonths) ||
        numberOfMonths < 1 ||
        numberOfMonths > 12
    ) {
        const error = new Error(
            "months doit être un entier compris entre 1 et 12"
        );

        error.statusCode = 400;
        throw error;
    }

    return Camion.aggregate([

        {
            $match: {
                statut: { $ne: "ARCHIVE" },
                dateMiseEnService: {
                    $type: "date",
                    $lte: new Date()
                }
            }
        },

        {
            $addFields: {
                debutMois: {
                    $dateTrunc: {
                        date: {
                            $max: [
                                "$dateMiseEnService",
                                {
                                    $dateSubtract: {
                                        startDate: "$$NOW",
                                        unit: "month",
                                        amount: numberOfMonths - 1
                                    }
                                }
                            ]
                        },
                        unit: "month"
                    }
                },

                moisActuel: {
                    $dateTrunc: {
                        date: "$$NOW",
                        unit: "month"
                    }
                }
            }
        },

        {
            $addFields: {
                nombreMois: {
                    $add: [
                        {
                            $dateDiff: {
                                startDate: "$debutMois",
                                endDate: "$moisActuel",
                                unit: "month"
                            }
                        },
                        1
                    ]
                }
            }
        },

        {
            $addFields: {
                mois: {
                    $map: {
                        input: {
                            $range: [0, "$nombreMois"]
                        },
                        as: "offset",
                        in: {
                            $dateAdd: {
                                startDate: "$debutMois",
                                unit: "month",
                                amount: "$$offset"
                            }
                        }
                    }
                }
            }
        },
        {
            $unwind: "$mois"
        },

        {
            $addFields: {
                periodeDebut: {
                    $max: [
                        "$dateMiseEnService",
                        "$mois"
                    ]
                },

                periodeFin: {
                    $min: [
                        {
                            $dateAdd: {
                                startDate: "$mois",
                                unit: "month",
                                amount: 1
                            }
                        },
                        "$$NOW"
                    ]
                }
            }
        },

        {
            $lookup: {
                from: Trajet.collection.name,

                let: {
                    camionId: "$_id",
                    debut: "$periodeDebut",
                    fin: "$periodeFin"
                },

                pipeline: [
                    {
                        $match: {
                            statut: "TERMINE",

                            $expr: {
                                $and: [
                                    {
                                        $eq: [
                                            "$camion",
                                            "$$camionId"
                                        ]
                                    },
                                    {
                                        $eq: [
                                            { $type: "$dateDepartReelle" },
                                            "date"
                                        ]
                                    },
                                    {
                                        $eq: [
                                            { $type: "$dateArriveeReelle" },
                                            "date"
                                        ]
                                    },
                                    {
                                        $gt: [
                                            "$dateArriveeReelle",
                                            "$dateDepartReelle"
                                        ]
                                    },
                                    {
                                        $lt: [
                                            "$dateDepartReelle",
                                            "$$fin"
                                        ]
                                    },
                                    {
                                        $gt: [
                                            "$dateArriveeReelle",
                                            "$$debut"
                                        ]
                                    }
                                ]
                            }
                        }
                    },

                    {
                        $addFields: {
                            debutMissionPeriode: {
                                $max: [
                                    "$dateDepartReelle",
                                    "$$debut"
                                ]
                            },

                            finMissionPeriode: {
                                $min: [
                                    "$dateArriveeReelle",
                                    "$$fin"
                                ]
                            }
                        }
                    },

                    {
                        $addFields: {
                            dureeMissionMs: {
                                $subtract: [
                                    "$finMissionPeriode",
                                    "$debutMissionPeriode"
                                ]
                            }
                        }
                    },

                    {
                        $match: {
                            dureeMissionMs: { $gt: 0 }
                        }
                    },

                    {
                        $group: {
                            _id: null,

                            tempsMissionMs: {
                                $sum: "$dureeMissionMs"
                            },

                            nombreMissions: {
                                $sum: 1
                            }
                        }
                    }
                ],

                as: "missionsStats"
            }
        },

        {
            $lookup: {
                from: Maintenance.collection.name,

                let: {
                    camionId: "$_id",
                    debut: "$periodeDebut",
                    fin: "$periodeFin"
                },

                pipeline: [
                    {
                        $match: {
                            statut: {
                                $in: ["EN_COURS", "TERMINEE"]
                            },

                            $expr: {
                                $and: [
                                    {
                                        $eq: [
                                            "$camion",
                                            "$$camionId"
                                        ]
                                    },
                                    {
                                        $eq: [
                                            { $type: "$dateDebut" },
                                            "date"
                                        ]
                                    },
                                    {
                                        $lt: [
                                            "$dateDebut",
                                            "$$fin"
                                        ]
                                    },
                                    {
                                        $gt: [
                                            {
                                                $ifNull: [
                                                    "$dateFin",
                                                    "$$NOW"
                                                ]
                                            },
                                            "$$debut"
                                        ]
                                    }
                                ]
                            }
                        }
                    },

                    {
                        $addFields: {
                            debutMaintenancePeriode: {
                                $max: [
                                    "$dateDebut",
                                    "$$debut"
                                ]
                            },

                            finMaintenancePeriode: {
                                $min: [
                                    {
                                        $ifNull: [
                                            "$dateFin",
                                            "$$NOW"
                                        ]
                                    },
                                    "$$fin"
                                ]
                            }
                        }
                    },

                    {
                        $addFields: {
                            dureeMaintenanceMs: {
                                $subtract: [
                                    "$finMaintenancePeriode",
                                    "$debutMaintenancePeriode"
                                ]
                            }
                        }
                    },

                    {
                        $match: {
                            dureeMaintenanceMs: { $gt: 0 }
                        }
                    },

                    {
                        $group: {
                            _id: null,

                            tempsMaintenanceMs: {
                                $sum: "$dureeMaintenanceMs"
                            },

                            nombreMaintenances: {
                                $sum: 1
                            }
                        }
                    }
                ],

                as: "maintenanceStats"
            }
        },

        {
            $addFields: {
                dureePeriodeMs: {
                    $subtract: [
                        "$periodeFin",
                        "$periodeDebut"
                    ]
                },

                tempsMissionMs: {
                    $ifNull: [
                        {
                            $arrayElemAt: [
                                "$missionsStats.tempsMissionMs",
                                0
                            ]
                        },
                        0
                    ]
                },

                nombreMissions: {
                    $ifNull: [
                        {
                            $arrayElemAt: [
                                "$missionsStats.nombreMissions",
                                0
                            ]
                        },
                        0
                    ]
                },

                tempsMaintenanceBrutMs: {
                    $ifNull: [
                        {
                            $arrayElemAt: [
                                "$maintenanceStats.tempsMaintenanceMs",
                                0
                            ]
                        },
                        0
                    ]
                },

                nombreMaintenances: {
                    $ifNull: [
                        {
                            $arrayElemAt: [
                                "$maintenanceStats.nombreMaintenances",
                                0
                            ]
                        },
                        0
                    ]
                }
            }
        },

        {
            $addFields: {
                tempsMaintenanceMs: {
                    $min: [
                        "$tempsMaintenanceBrutMs",
                        "$dureePeriodeMs"
                    ]
                }
            }
        },

        {
            $addFields: {
                tempsMissionMs: {
                    $min: [
                        "$tempsMissionMs",
                        "$dureePeriodeMs"
                    ]
                }
            }
        },

        {
            $addFields: {
                tempsDisponibleMs: {
                    $max: [
                        0,
                        {
                            $subtract: [
                                "$dureePeriodeMs",
                                "$tempsMaintenanceMs"
                            ]
                        }
                    ]
                }
            }
        },

        {
            $addFields: {
                tauxUtilisation: {
                    $cond: [
                        {
                            $gt: [
                                {
                                    $add: [
                                        "$tempsDisponibleMs",
                                        "$tempsMaintenanceMs"
                                    ]
                                },
                                0
                            ]
                        },
                        {
                            $multiply: [
                                {
                                    $divide: [
                                        "$tempsMissionMs",
                                        {
                                            $add: [
                                                "$tempsDisponibleMs",
                                                "$tempsMaintenanceMs"
                                            ]
                                        }
                                    ]
                                },
                                100
                            ]
                        },
                        0
                    ]
                }
            }
        },

        {
            $project: {
                _id: 0,

                camionId: "$_id",
                nom: 1,
                immatriculation: 1,
                statut: 1,

                periode: {
                    $dateToString: {
                        format: "%Y-%m",
                        date: "$mois",
                        timezone: "UTC"
                    }
                },

                nombreMissions: 1,
                nombreMaintenances: 1,

                tempsMissionHeures: {
                    $round: [
                        {
                            $divide: [
                                "$tempsMissionMs",
                                3600000
                            ]
                        },
                        2
                    ]
                },

                tempsDisponibleHeures: {
                    $round: [
                        {
                            $divide: [
                                "$tempsDisponibleMs",
                                3600000
                            ]
                        },
                        2
                    ]
                },

                tempsMaintenanceHeures: {
                    $round: [
                        {
                            $divide: [
                                "$tempsMaintenanceMs",
                                3600000
                            ]
                        },
                        2
                    ]
                },

                tauxUtilisationPourcent: {
                    $round: [
                        "$tauxUtilisation",
                        2
                    ]
                }
            }
        },

        {
            $sort: {
                immatriculation: 1,
                periode: 1
            }
        }
    ]);
};

module.exports = {
    getFleetUtilizationTrends
};
