import CategoryCard from "../CategoryCard";

import Category1 from "../../assets/images/category-1.webp";
import Category2 from "../../assets/images/category-2.webp";
import Category3 from "../../assets/images/category-3.webp";
import Category4 from "../../assets/images/category-4.webp";
import Category5 from "../../assets/images/category-5.webp";
import Category6 from "../../assets/images/category-6.webp";
import Category7 from "../../assets/images/category-7.webp";
import Category8 from "../../assets/images/category-8.webp";
import Category9 from "../../assets/images/category-9.webp";
import Category10 from "../../assets/images/category-10.webp";

const Categories = () => {
  return (
    <section className="w-custom m-auto">
      <p className="text-start text-4xl font-black tracking-wide mt-20 mb-10">
        Product Categories
      </p>
      <div className="grid max-[500px]:grid-cols-1 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <CategoryCard
          categoryTitle="Clothing & Shoes"
          productTitle="Sneakers"
          image={Category1}
          bgColor="bg-red-100"
          textColor="text-red-500"
          loading="eager"
        />
        <CategoryCard
          categoryTitle="Mobile & Electronics"
          productTitle="Z-FLIP"
          image={Category2}
          bgColor="bg-zinc-200"
          textColor="text-zinc-500"
          loading="eager"
        />
        <CategoryCard
          categoryTitle="Pet Care"
          productTitle="Cat Food"
          image={Category3}
          bgColor="bg-purple-200"
          textColor="text-purple-500"
          loading="eager"
        />
        <CategoryCard
          categoryTitle="Home & Kitchen"
          productTitle="Sofa"
          image={Category5}
          bgColor="bg-green-100"
          textColor="text-green-500"
          loading="lazy"
        />
        <CategoryCard
          categoryTitle="Beauty & Personal Care"
          productTitle="Moisturizer"
          image={Category7}
          bgColor="bg-blue-100"
          textColor="text-blue-500"
          loading="lazy"
        />
        <CategoryCard
          categoryTitle="Grocery & Food"
          productTitle="Bread"
          image={Category4}
          bgColor="bg-amber-100"
          textColor="text-amber-500"
          loading="lazy"
        />
        <CategoryCard
          categoryTitle="Health & Fitness"
          productTitle="Dumbells"
          image={Category6}
          bgColor="bg-gray-300"
          textColor="text-gray-500"
          loading="lazy"
        />
        <CategoryCard
          categoryTitle="Books & Stationery"
          productTitle="Pencils"
          image={Category8}
          bgColor="bg-pink-100"
          textColor="text-pink-500"
          loading="lazy"
        />
        <CategoryCard
          categoryTitle="Toy & Baby Items"
          productTitle="Train"
          image={Category9}
          bgColor="bg-yellow-100"
          textColor="text-yellow-500"
          loading="lazy"
        />
        <CategoryCard
          categoryTitle="Others"
          productTitle="Gift Box Set"
          image={Category10}
          bgColor="bg-fuchsia-200"
          textColor="text-fuchsia-500"
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default Categories;
