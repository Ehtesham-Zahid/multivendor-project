const asyncHandler = require("express-async-handler");
const cloudinary = require("../config/cloudinary");

const uploadAvatar = asyncHandler(async (filePath, id, folderName) => {
  const uploadResult = await cloudinary.uploader.upload(filePath, {
    folder: folderName, // optional folder
    public_id: `${folderName}_${id}`, // unique identifier
  });

  // Optimize delivery by resizing and applying auto-format and auto-quality
  const optimizeUrl = cloudinary.url(`${folderName}_${id}`, {
    fetch_format: "auto",
    quality: "auto",
  });

  // Transform the image: auto-crop to square aspect_ratio
  const autoCropUrl = cloudinary.url(`${folderName}_${id}`, {
    crop: "auto",
    gravity: "auto",
    width: 500,
    height: 500,
  });

  return {
    original: uploadResult.secure_url,
    optimized: optimizeUrl,
    cropped: autoCropUrl,
  };
});

module.exports = uploadAvatar;
