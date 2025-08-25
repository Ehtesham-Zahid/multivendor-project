import React, { useState, useEffect } from "react";
import CategoryCard from "../CategoryCard";
import API from "../../api/axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await API.get("/api/categories");
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
      <p className="text-start text-4xl font-black tracking-wide mt-20 mb-10">
        Product Categories
      </p>
      <div className="grid max-[500px]:grid-cols-1 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            categoryTitle={category.name}
            productTitle={category.productTitle}
            image={category.image}
            bgColor={category.bgColor}
            textColor={category.textColor}
            loading="eager"
          />
        ))}
      </div>
    </section>
  );
};

export default Categories;
