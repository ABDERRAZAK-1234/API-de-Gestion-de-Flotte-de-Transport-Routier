const express = require("express");

const {
    createPneu,
    getAllPneus,
    getPneuById,
    updatePneu,
    deletePneu
} = require("../controllers/pneuController");

const {
    authenticate,
    authorize
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authenticate);
router.use(authorize("ADMIN", "SUPER_ADMIN"));

router.post("/", createPneu);
router.get("/", getAllPneus);
router.get("/:id", getPneuById);
router.put("/:id", updatePneu);
router.delete("/:id", deletePneu);

module.exports = router;