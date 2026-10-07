// userRoutes.js
const { authenticate, authorize } = require("../middlewares/authMiddleware");

router.use(authenticate, authorize("SUPER_ADMIN", "ADMIN"));

router.get("/pending", userController.pending);
router.patch("/:id/validate", userController.validate);
router.patch("/:id/reject", userController.reject);