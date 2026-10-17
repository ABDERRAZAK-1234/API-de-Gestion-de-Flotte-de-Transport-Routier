
const Pneu = require("../models/Pneu");

const getTiresHealthMatrix = async () => {
    return Pneu.aggregate([
        {
            $match: {
                archive: { $ne: true },
                etat: { $ne: "REMPLACE" },

                position: {
                    $type: "string",
                    $ne: ""
                },

                kilometrageUsure: {
                    $type: "number",
                    $gte: 0
                },

                profondeurSculpture: {
                    $type: "number",
                    $gte: 0
                },

                $or: [
                    { seuilUsure: { $exists: false } },
                    { seuilUsure: null },
                    {
                        seuilUsure: {
                            $type: "number",
                            $gte: 0
                        }
                    }
                ]
            }
        },

        {
            $addFields: {
                remainingKm: {
                    $max: [
                        0,
                        {
                            $subtract: [
                                {
                                    $ifNull: [
                                        "$seuilUsure",
                                        80000
                                    ]
                                },
                                "$kilometrageUsure"
                            ]
                        }
                    ]
                }
            }
        },

        {
            $addFields: {
                isCritical: {
                    $or: [
                        { $lt: ["$remainingKm", 5000] },
                        { $lte: ["$profondeurSculpture", 3] }
                    ]
                }
            }
        },

        {
            $group: {
                _id: "$position",

                nombrePneus: {
                    $sum: 1
                },

                kilometrageMoyen: {
                    $avg: "$remainingKm"
                },

                nombrePneusCritiques: {
                    $sum: {
                        $cond: [
                            "$isCritical",
                            1,
                            0
                        ]
                    }
                },

                budgetEstimeMAD: {
                    $sum: {
                        $cond: [
                            "$isCritical",
                            3800,
                            0
                        ]
                    }
                }
            }
        }
    ]);
};

module.exports = {
    getTiresHealthMatrix
};
