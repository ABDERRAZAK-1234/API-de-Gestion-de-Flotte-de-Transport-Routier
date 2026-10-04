const express = require("express");

const {
    createTrajet,
    getAllTrajets,
    getTrajetById,
    updateTrajet,
    deleteTrajet
} = require("../controllers/trajetController");

const router = express.Router();

router.post("/", createTrajet);
router.get("/", getAllTrajets);
router.get("/:id", getTrajetById);
router.put("/:id", updateTrajet);
router.delete("/:id", deleteTrajet);

module.exports = router;