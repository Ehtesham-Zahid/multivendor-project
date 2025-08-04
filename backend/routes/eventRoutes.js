const express = require("express");
const router = express.Router();
const {
  getActiveEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getShopEvents,
} = require("../controllers/eventControllers");
const { protect } = require("../middlewares/authMiddleware");

router.post("/", protect, createEvent);
router.get("/getActiveEvents", getActiveEvents);
router.get("/getShopEvents", protect, getShopEvents);
router.patch("/:id", protect, updateEvent);
router.delete("/:id", protect, deleteEvent);
router.get("/:id", getEventById);

module.exports = router;
