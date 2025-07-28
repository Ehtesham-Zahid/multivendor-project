import CategoryCard from "../CategoryCard";

import CategoryImage1 from "../../assets/images/category-1.png";
import CategoryImage2 from "../../assets/images/category-2.png";
import CategoryImage3 from "../../assets/images/category-3.png";
import CategoryImage4 from "../../assets/images/category-4.png";
import CategoryImage5 from "../../assets/images/category-5.png";
import CategoryImage6 from "../../assets/images/category-6.png";
import CategoryImage7 from "../../assets/images/category-7.png";
import CategoryImage8 from "../../assets/images/category-8.png";

const Categories = () => {
  return (
    <section className="w-custom m-auto">
      <p className="text-start text-4xl font-black tracking-wide mt-20 mb-10">
        Product Categories
      </p>
      <div className="grid grid-cols-5 gap-4">
        <CategoryCard
          categoryTitle="Clothing & Shoes"
          productTitle="Sneakers"
          image={CategoryImage1}
          bgColor="bg-red-100"
          textColor="text-red-500"
          span={2}
        />
        <CategoryCard
          categoryTitle="Mobile & Electronics"
          productTitle="Z-FLIP"
          image={CategoryImage2}
          bgColor="bg-zinc-200"
          textColor="text-zinc-500"
        />{" "}
        <CategoryCard
          categoryTitle="Home & Kitchen"
          productTitle="Sofa"
          image={CategoryImage3}
          bgColor="bg-green-100"
          textColor="text-green-500"
        />{" "}
        <CategoryCard
          categoryTitle="Beauty & Personal Care"
          productTitle="Moisturizer"
          image={CategoryImage4}
          bgColor="bg-blue-100"
          textColor="text-blue-500"
        />{" "}
        <CategoryCard
          categoryTitle="Grocery & Food"
          productTitle="Bread"
          image={CategoryImage5}
          bgColor="bg-amber-100"
          textColor="text-amber-500"
        />
        <CategoryCard
          categoryTitle="Health & Fitness"
          productTitle="Dumbells"
          image={CategoryImage6}
          bgColor="bg-gray-300"
          textColor="text-gray-500"
        />
        <CategoryCard
          categoryTitle="Books & Stationery"
          productTitle="Pencils"
          image={CategoryImage7}
          bgColor="bg-pink-100"
          textColor="text-pink-500"
        />
        <CategoryCard
          categoryTitle="Toy & Baby Items"
          productTitle="Train"
          image={CategoryImage8}
          bgColor="bg-yellow-100"
          span={2}
          textColor="text-yellow-500"
        />
        {/* <CategoryCard
          categoryTitle="Car & Bike Accessories"
          productTitle="Sneakers"
          image={CategoryImage1}
        />
        <CategoryCard
          categoryTitle="Others"
          productTitle="Sneakers"
          image={CategoryImage1}
        /> */}
      </div>
    </section>
  );
};

export default Categories;
