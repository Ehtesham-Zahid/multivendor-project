const express = require("express");
const router = express.Router();
const {
  getActiveEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getShopEvents,
  getAllEventsAdmin,
} = require("../controllers/eventControllers");
const { protect, isAdmin } = require("../middlewares/authMiddleware");

router.post("/", protect, createEvent);
router.get("/getActiveEvents", getActiveEvents);
router.get("/getShopEvents", protect, getShopEvents);
router.patch("/:eventId", protect, updateEvent);
router.delete("/:eventId", protect, deleteEvent);
router.get("/:eventId", getEventById);

// Admin Routes
router.get("/admin/all-events", protect, isAdmin, getAllEventsAdmin);

module.exports = router;
