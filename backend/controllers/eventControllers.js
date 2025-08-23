const asyncHandler = require("express-async-handler");
const Event = require("../models/eventModel");
const Product = require("../models/productModel");
const Shop = require("../models/shopModel");

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

  // Ensure shop exists and is active before creating events
  const shop = await Shop.findById(req.user.shopId);
  if (!shop) {
    res.status(404);
    throw new Error("Shop not found");
  }
  if (!shop.isActive) {
    res.status(403);
    throw new Error(
      "Your shop is inactive. Activate your shop to create events"
    );
  }

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  if (product.eventId) {
    res.status(400);
    throw new Error("This product already has an event");
  }

  let event;

  // Get current date at start of day (00:00:00)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get start date at start of day
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);

  // Get end date at end of day (23:59:59) to allow same-day events
  const end = new Date(endDate);
  end.setHours(23, 59, 59, 999);

  console.log("Today:", today);
  console.log("Start:", start);
  console.log("End:", end);

  // Date-only comparison: start date cannot be before today
  if (start < today) {
    res.status(400);
    throw new Error("Start date cannot be in the past");
  }

  // End date cannot be before start date
  if (end < start) {
    res.status(400);
    throw new Error("End date cannot be before start date");
  }

  // Check if event is active (current date is between start and end, inclusive)
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const isActive = start <= currentDate && end >= currentDate;

  try {
    event = await Event.create({
      name,
      originalPrice,
      eventPrice,
      productId,
      startDate: start,
      endDate: end,
      shopId: req.user.shopId,
      isActive,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message || "Server error while creating event");
  }

  product.eventId = event._id;
  await product.save();

  shop.events.push(event._id);
  await shop.save();

  await event.populate("productId");

  res.status(201).json(event);
});

// @desc    Get all active events
// @route   GET /api/events
// @access  Public
const getActiveEvents = asyncHandler(async (req, res) => {
  const { sortBy, limit } = req.query;

  const pipeline = [
    { $match: { isActive: true } },
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "productId",
      },
    },
    {
      $lookup: {
        from: "shops",
        localField: "shopId",
        foreignField: "_id",
        as: "shopId",
      },
    },
    { $unwind: "$productId" },
    { $unwind: "$shopId" },
  ];

  if (sortBy === "sales") {
    pipeline.push({ $sort: { "productId.sold": -1 } });
  }

  if (limit) {
    pipeline.push({ $limit: parseInt(limit) });
  }

  const events = await Event.aggregate(pipeline);
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
  const event = await Event.findById(req.params.eventId);

  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  const { name, productId, startDate, endDate, shopId, isActive } = req.body;

  event.name = name || event.name;
  event.originalPrice = req.body.originalPrice || event.originalPrice;
  event.eventPrice = req.body.eventPrice || event.eventPrice;
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
  const event = await Event.findById(req.params.eventId);

  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  await event.deleteOne();
  const product = await Product.findById(event.productId);
  if (product) {
    product.eventId = null;
    await product.save();
  }
  res.json({ message: "Event deleted successfully" });
});

const getShopEvents = asyncHandler(async (req, res) => {
  const shopId = req.user.shopId;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const events = await Event.find({ shopId })
    .populate("productId")
    .sort({ startDate: -1 })
    .skip(skip)
    .limit(limit);

  const totalEvents = await Event.countDocuments({ shopId });
  const totalPages = Math.ceil(totalEvents / limit);

  res.status(200).json({
    events,
    totalEvents,
    totalPages,
    currentPage: page,
  });
});

// Admin Controllers

const getAllEventsAdmin = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const onlyActive = req.query.onlyActive;
  const sortBy = req.query.sortBy === "sales" ? { "productId.sold": -1 } : {};

  const filter = {};

  if (onlyActive === "true" || onlyActive === "false") {
    filter.isActive = onlyActive;
  }

  const totalEvents = await Event.countDocuments(filter);
  const totalPages = Math.ceil(totalEvents / limit);

  const events = await Event.find(filter)
    .sort(sortBy)
    .skip(skip)
    .limit(limit)
    .populate("productId")
    .populate("shopId");

  res.status(200).json({
    events,
    totalEvents,
    totalPages,
    currentPage: page,
  });
});

module.exports = {
  createEvent,
  getActiveEvents,
  getEventById,
  getShopEvents,
  updateEvent,
  deleteEvent,
  getAllEventsAdmin,
};
