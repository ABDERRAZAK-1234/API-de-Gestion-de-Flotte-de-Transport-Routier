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

const validate = require("../middlewares/validate");

const {
    createPneuSchema,
    updatePneuSchema
} = require("../validations/pneuValidation");

const router = express.Router();

router.use(authenticate);
router.use(authorize("ADMIN", "SUPER_ADMIN"));

router.post(
    "/",
    validate(createPneuSchema),
    createPneu
);

router.get("/", getAllPneus);

router.get("/:id", getPneuById);

router.put(
    "/:id",
    validate(updatePneuSchema),
    updatePneu
);

router.delete("/:id", deletePneu);

module.exports = router;