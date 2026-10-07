const express = require("express");

const {
    createRemorque,
    getAllRemorques,
    getRemorqueById,
    updateRemorque,
    deleteRemorque
} = require("../controllers/remorqueController");

const {
    authenticate,
    authorize
} = require("../middlewares/authMiddleware");

const validate = require("../middlewares/validate");

const {
    createRemorqueSchema,
    updateRemorqueSchema
} = require("../validations/remorqueValidation");

const router = express.Router();

router.use(authenticate);
router.use(authorize("ADMIN", "SUPER_ADMIN"));

router.post(
    "/",
    validate(createRemorqueSchema),
    createRemorque
);

router.get("/", getAllRemorques);

router.get("/:id", getRemorqueById);

router.put(
    "/:id",
    validate(updateRemorqueSchema),
    updateRemorque
);

router.delete("/:id", deleteRemorque);

module.exports = router;