const express = require("express");

const {
    createRemorque,
    getAllRemorques,
    getRemorqueById,
    updateRemorque,
    deleteRemorque
} = require("../controllers/remorqueController");

const router = express.Router();

router.post("/", createRemorque);
router.get("/", getAllRemorques);
router.get("/:id", getRemorqueById);
router.put("/:id", updateRemorque);
router.delete("/:id", deleteRemorque);

module.exports = router;