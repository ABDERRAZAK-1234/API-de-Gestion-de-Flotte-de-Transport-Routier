const express = require("express");

const userController = require("../controllers/userController");

const {
    authenticate,
    authorize
} = require("../middlewares/authMiddleware");

const validate = require("../middlewares/validate");

const {
    updateUserSchema
} = require("../validations/userValidation");

const router = express.Router();

router.use(authenticate, authorize("SUPER_ADMIN", "ADMIN"));

router.get("/pending", userController.pending);
router.patch("/:id/validate", userController.validate);
router.patch("/:id/reject", userController.reject);

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);

router.put(
    "/:id",
    validate(updateUserSchema),
    userController.updateUser
);

router.patch("/:id/suspend", userController.suspend);
router.patch("/:id/reactivate", userController.reactivate);

module.exports = router;