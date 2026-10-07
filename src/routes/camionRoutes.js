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

const validate = require("../middlewares/validate");

const {
    createCamionSchema,
    updateCamionSchema
} = require("../validations/camionValidation");

const router = express.Router();

router.use(authenticate);
router.use(authorize("ADMIN", "SUPER_ADMIN"));

router.post(
    "/",
    validate(createCamionSchema),
    createCamion
);

router.get("/", getAllCamions);

router.get("/:id", getCamionById);

router.put(
    "/:id",
    validate(updateCamionSchema),
    updateCamion
);

router.delete("/:id", deleteCamion);

module.exports = router;