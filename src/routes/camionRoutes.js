const express = require("express");

const {
    createCamion,
    getAllCamions,
    getCamionById,
    updateCamion,
    deleteCamion
} = require("../controllers/camionController");

const {
    authenticate,
    authorize
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authenticate);
router.use(authorize("ADMIN", "SUPER_ADMIN"));

router.post("/", createCamion);
router.get("/", getAllCamions);
router.get("/:id", getCamionById);
router.put("/:id", updateCamion);
router.delete("/:id", deleteCamion);

module.exports = router;