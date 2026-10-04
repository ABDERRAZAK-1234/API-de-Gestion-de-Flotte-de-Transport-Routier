const express = require("express");

const {
    createCamion,
    getAllCamions,
    getCamionById,
    updateCamion,
    deleteCamion
} = require("../controllers/camionController");

const router = express.Router();

router.post("/", createCamion);
router.get("/", getAllCamions);
router.get("/:id", getCamionById);
router.put("/:id", updateCamion);
router.delete("/:id", deleteCamion);

module.exports = router;