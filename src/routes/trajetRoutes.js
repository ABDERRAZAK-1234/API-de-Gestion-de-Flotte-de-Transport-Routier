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

const validate = require("../middlewares/validate");

const {
    createTrajetSchema,
    updateTrajetSchema
} = require("../validations/trajetValidation");

const router = express.Router();

router.use(authenticate);
router.use(authorize("ADMIN", "SUPER_ADMIN"));

router.post(
    "/",
    validate(createTrajetSchema),
    createTrajet
);

router.get("/", getAllTrajets);

router.get("/:id", getTrajetById);

router.put(
    "/:id",
    validate(updateTrajetSchema),
    updateTrajet
);

router.delete("/:id", deleteTrajet);

module.exports = router;