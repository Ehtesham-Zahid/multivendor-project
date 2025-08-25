import React, { useState, useEffect } from "react";
import CategoryCard from "../CategoryCard";
import API from "../../api/axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await API.get("/categories");
        console.log("API Response:", response.data); // Debug log
        console.log("Categories data:", response.data.data); // Debug log
        setCategories(response.data.data);
      } catch (err) {
        setError("Failed to load categories");
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Debug log for current state
  console.log("Current categories state:", categories);

  if (loading) {
    return (
      <section className="w-custom m-auto">
        <p className="text-start text-4xl font-black tracking-wide mt-20 mb-10">
          Product Categories
        </p>
        <div className="grid max-[500px]:grid-cols-1 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="h-72 bg-gray-200 rounded-md animate-pulse"
            ></div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-custom m-auto">
        <p className="text-start text-4xl font-black tracking-wide mt-20 mb-10">
          Product Categories
        </p>
        <div className="text-center text-red-500 py-10">{error}</div>
      </section>
    );
  }

  return (
    <section className="w-custom m-auto">
      {/* Tailwind safelist: ensure these classes exist in final CSS */}
      <div className="hidden">
        <div className="bg-red-100 text-red-500 bg-zinc-200 text-zinc-500 bg-purple-200 text-purple-500 bg-green-100 text-green-500 bg-blue-100 text-blue-500 bg-amber-100 text-amber-500 bg-gray-300 text-gray-500 bg-pink-100 text-pink-500 bg-fuchsia-200 text-fuchsia-500 bg-yellow-100 text-yellow-500" />
      </div>

      <p className="text-start text-4xl font-black tracking-wide mt-20 mb-10">
        Product Categories
      </p>
      <div className="grid max-[500px]:grid-cols-1 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="border border-transparent p-0">
            <CategoryCard
              key={category.id}
              categoryTitle={category.name}
              productTitle={category.productTitle}
              image={`${backendUrl}${category.image}`}
              bgColor={category.bgColor}
              textColor={category.textColor}
              loading="eager"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
