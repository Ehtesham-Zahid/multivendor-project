const express = require("express");
const { getCategories } = require("../controllers/categoryControllers");

const router = express.Router();

// GET /api/categories - Get all categories
router.get("/", getCategories);

module.exports = router;
