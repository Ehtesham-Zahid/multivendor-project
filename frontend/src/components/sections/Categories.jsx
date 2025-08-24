import CategoryCard from "../CategoryCard";

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
          image={
            "https://res.cloudinary.com/dtz0urit6/image/upload/f_webp,q_auto/cloudinary-tools-uploads/noywqwpsizavm1oknktz.webp"
          }
          bgColor="bg-red-100"
          textColor="text-red-500"
          loading="lazy"
        />
        <CategoryCard
          categoryTitle="Mobile & Electronics"
          productTitle="Z-FLIP"
          image={
            "https://res.cloudinary.com/dtz0urit6/image/upload/f_webp,q_auto/cloudinary-tools-uploads/p6uktopq2kfkp1nozsss.webp"
          }
          bgColor="bg-zinc-200"
          textColor="text-zinc-500"
          loading="lazy"
        />
        <CategoryCard
          categoryTitle="Pet Care"
          productTitle="Cat Food"
          image={
            "https://res.cloudinary.com/dtz0urit6/image/upload/f_webp,q_auto/cloudinary-tools-uploads/wagvlaknxkvkkfidlpus.webp"
          }
          bgColor="bg-purple-200"
          textColor="text-purple-500"
          loading="lazy"
        />
        <CategoryCard
          categoryTitle="Home & Kitchen"
          productTitle="Sofa"
          image={
            "https://res.cloudinary.com/dtz0urit6/image/upload/f_webp,q_auto/cloudinary-tools-uploads/jreyo83g5jmozoknxrez.webp"
          }
          bgColor="bg-green-100"
          textColor="text-green-500"
          loading="lazy"
        />
        <CategoryCard
          categoryTitle="Beauty & Personal Care"
          productTitle="Moisturizer"
          image={
            "https://res.cloudinary.com/dtz0urit6/image/upload/f_webp,q_auto/cloudinary-tools-uploads/xwjkkuwcrt6n3ucfwyxe.webp"
          }
          bgColor="bg-blue-100"
          textColor="text-blue-500"
          loading="lazy"
        />
        <CategoryCard
          categoryTitle="Grocery & Food"
          productTitle="Bread"
          image={
            "https://res.cloudinary.com/dtz0urit6/image/upload/f_webp,q_auto/cloudinary-tools-uploads/pkekelaxdzzjkxrjbiv0.webp"
          }
          bgColor="bg-amber-100"
          textColor="text-amber-500"
          loading="lazy"
        />
        <CategoryCard
          categoryTitle="Health & Fitness"
          productTitle="Dumbells"
          image={
            "https://res.cloudinary.com/dtz0urit6/image/upload/f_webp,q_auto/cloudinary-tools-uploads/evu3idehsr2uzaulfpuv.webp"
          }
          bgColor="bg-gray-300"
          textColor="text-gray-500"
          loading="lazy"
        />
        <CategoryCard
          categoryTitle="Books & Stationery"
          productTitle="Pencils"
          image={
            "https://res.cloudinary.com/dtz0urit6/image/upload/f_webp,q_auto/cloudinary-tools-uploads/vijpharenscewn1gf7fk.webp"
          }
          bgColor="bg-pink-100"
          textColor="text-pink-500"
          loading="lazy"
        />
        <CategoryCard
          categoryTitle="Others"
          productTitle="Gift Box Set"
          image={
            "https://res.cloudinary.com/dtz0urit6/image/upload/f_webp,q_auto/cloudinary-tools-uploads/csor3nystap9exfgz7br.webp"
          }
          bgColor="bg-fuchsia-200"
          textColor="text-fuchsia-500"
          loading="lazy"
        />
        <CategoryCard
          categoryTitle="Toy & Baby Items"
          productTitle="Train"
          image={
            "https://res.cloudinary.com/dtz0urit6/image/upload/f_webp,q_auto/cloudinary-tools-uploads/yluer9pbnqp5xjrvvepc.webp"
          }
          bgColor="bg-yellow-100"
          span={1}
          textColor="text-yellow-500"
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default Categories;
