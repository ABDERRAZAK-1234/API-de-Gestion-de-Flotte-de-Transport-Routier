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


router.post(
    "/",
    authorize("ADMIN", "SUPER_ADMIN"),
    validate(createTrajetSchema),
    createTrajet
);

router.get(
    "/",
    authorize("ADMIN", "SUPER_ADMIN", "CHAUFFEUR"),
    getAllTrajets
);

router.get(
    "/:id",
    authorize("ADMIN", "SUPER_ADMIN", "CHAUFFEUR"),
    getTrajetById
);

router.put(
    "/:id",
    authorize("ADMIN", "SUPER_ADMIN", "CHAUFFEUR"),
    validate(updateTrajetSchema),
    updateTrajet
);

router.delete(
    "/:id",
    authorize("ADMIN", "SUPER_ADMIN"),
    deleteTrajet
);

module.exports = router;