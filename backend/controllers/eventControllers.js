const asyncHandler = require("express-async-handler");
const Event = require("../models/eventModel");

// @desc    Create a new event
// @route   POST /api/events
// @access  Private (seller only)
const createEvent = asyncHandler(async (req, res) => {
  const { name, originalPrice, eventPrice, productId, startDate, endDate } =
    req.body;

  if (
    !name ||
    !originalPrice ||
    !eventPrice ||
    !productId ||
    !startDate ||
    !endDate
  ) {
    res.status(400);
    throw new Error("All fields are required");
  }

  let event;

  try {
    event = await Event.create({
      name,
      originalPrice,
      eventPrice,
      productId,
      startDate,
      endDate,
      shopId: req.user.shopId,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message || "Server error while creating event");
  }

  res.status(201).json(event);
});

// @desc    Get all active events
// @route   GET /api/events
// @access  Public
const getActiveEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({ isActive: true })
    .populate("productId")
    .populate("shopId");
  res.json(events);
});

// @desc    Get single event by ID
// @route   GET /api/events/:id
// @access  Public
const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id)
    .populate("productId")
    .populate("shopId");

  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  res.json(event);
});

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private (seller only)
const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  const { productId, startDate, endDate, shopId, isActive } = req.body;

  event.productId = productId || event.productId;
  event.startDate = startDate || event.startDate;
  event.endDate = endDate || event.endDate;
  event.shopId = shopId || event.shopId;
  if (isActive !== undefined) event.isActive = isActive;

  const updatedEvent = await event.save();
  res.json(updatedEvent);
});

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private (seller only)
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  await event.remove();
  res.json({ message: "Event deleted successfully" });
});

const getShopEvents = asyncHandler(async (req, res) => {
  const shopId = req.user.shopId;

  const events = await Event.find({ shopId })
    .populate("productId")
    .sort({ startDate: -1 }); // Sort by start date, latest first
  res.status(200).json(events);
});

module.exports = {
  createEvent,
  getActiveEvents,
  getEventById,
  getShopEvents,
  updateEvent,
  deleteEvent,
};
