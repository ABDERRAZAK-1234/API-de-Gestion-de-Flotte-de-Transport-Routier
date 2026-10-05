const express = require("express");

const {
    createPneu,
    getAllPneus,
    getPneuById,
    updatePneu,
    deletePneu
} = require("../controllers/pneuController");

const router = express.Router();

router.post("/", createPneu);
router.get("/", getAllPneus);
router.get("/:id", getPneuById);
router.put("/:id", updatePneu);
router.delete("/:id", deletePneu);

module.exports = router;