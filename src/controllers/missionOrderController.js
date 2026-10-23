const missionOrderService = require("../services/missionOrderService");

const getMissionOrderUrl = async (req, res, next) => {
  try {
    const data = await missionOrderService.getMissionOrderUrl({
      trajetId: req.params.id,
      user: req.user,
    });

    return res.status(200).json({
      success: true,
      message: "Ordre de mission prêt au téléchargement",
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMissionOrderUrl,
};