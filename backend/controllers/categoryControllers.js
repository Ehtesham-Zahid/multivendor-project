const getCategories = async (req, res) => {
  try {
    const categories = [
      {
        id: 1,
        name: "Clothing & Shoes",
        productTitle: "Sneakers",
        image:
          "https://res.cloudinary.com/dvylumxml/image/upload/v1756126384/category-1_dvda5h.webp",
        bgColor: "bg-red-100",
        textColor: "text-red-500",
        slug: "clothing-shoes",
      },
      {
        id: 2,
        name: "Mobile & Electronics",
        productTitle: "Z-FLIP",
        image:
          "https://res.cloudinary.com/dvylumxml/image/upload/v1756126384/category-2_ri4zhd.webp",
        bgColor: "bg-zinc-200",
        textColor: "text-zinc-500",
        slug: "mobile-electronics",
      },
      {
        id: 3,
        name: "Pet Care",
        productTitle: "Cat Food",
        image:
          "https://res.cloudinary.com/dvylumxml/image/upload/v1756126381/category-3_xm5nn5.webp",
        bgColor: "bg-purple-200",
        textColor: "text-purple-500",
        slug: "pet-care",
      },
      {
        id: 4,
        name: "Home & Kitchen",
        productTitle: "Sofa",
        image:
          "https://res.cloudinary.com/dvylumxml/image/upload/v1756126385/category-5_e8eync.webp",
        bgColor: "bg-green-100",
        textColor: "text-green-500",
        slug: "home-kitchen",
      },
      {
        id: 5,
        name: "Beauty & Personal Care",
        productTitle: "Moisturizer",
        image:
          "https://res.cloudinary.com/dvylumxml/image/upload/v1756126383/category-7_xlpgmd.webp",
        bgColor: "bg-blue-100",
        textColor: "text-blue-500",
        slug: "beauty-personal-care",
      },
      {
        id: 6,
        name: "Grocery & Food",
        productTitle: "Bread",
        image:
          "https://res.cloudinary.com/dvylumxml/image/upload/v1756126381/category-4_tvgyqo.webp",
        bgColor: "bg-amber-100",
        textColor: "text-amber-500",
        slug: "grocery-food",
      },
      {
        id: 7,
        name: "Health & Fitness",
        productTitle: "Dumbells",
        image:
          "https://res.cloudinary.com/dvylumxml/image/upload/v1756126386/category-6_g91nvk.webp",
        bgColor: "bg-gray-300",
        textColor: "text-gray-500",
        slug: "health-fitness",
      },
      {
        id: 8,
        name: "Books & Stationery",
        productTitle: "Pencils",
        image:
          "https://res.cloudinary.com/dvylumxml/image/upload/v1756126382/category-8_mapifr.webp",
        bgColor: "bg-pink-100",
        textColor: "text-pink-500",
        slug: "books-stationery",
      },
      {
        id: 9,
        name: "Toy & Baby Items",
        productTitle: "Train",
        image:
          "https://res.cloudinary.com/dvylumxml/image/upload/v1756126385/category-9_s8u3bn.webp",
        bgColor: "bg-yellow-100",
        textColor: "text-yellow-500",
        slug: "toy-baby-items",
      },
      {
        id: 10,
        name: "Others",
        productTitle: "Gift Box Set",
        image:
          "https://res.cloudinary.com/dvylumxml/image/upload/v1756126384/category-10_vwwuay.webp",
        bgColor: "bg-fuchsia-200",
        textColor: "text-fuchsia-500",
        slug: "others",
      },
    ];

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
      error: error.message,
    });
  }
};

module.exports = {
  getCategories,
};
