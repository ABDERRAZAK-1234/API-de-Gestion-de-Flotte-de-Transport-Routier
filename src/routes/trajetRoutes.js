const express = require("express");

const {
    createTrajet,
    getAllTrajets,
    getTrajetById,
    updateTrajet,
    deleteTrajet
} = require("../controllers/trajetController");

const {
    authenticate,
    authorize
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authenticate);
router.use(authorize("ADMIN", "SUPER_ADMIN"));

router.post("/", createTrajet);
router.get("/", getAllTrajets);
router.get("/:id", getTrajetById);
router.put("/:id", updateTrajet);
router.delete("/:id", deleteTrajet);

module.exports = router;