// helper function
export const formatDate = (isoDate) => {
  if (!isoDate) return "";
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getDiscountPercentage = (originalPrice, discountedPrice) => {
  if (originalPrice <= 0) return 0; // avoid division by zero
  const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
  return Math.round(discount); // round to nearest whole number
};
