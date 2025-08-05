import ProductCard from "../ProductCard";

const BestSelling = () => {
  return (
    <section className="w-custom m-auto">
      <p className="text-start text-4xl font-black tracking-wide mt-20 mb-10">
        Best Selling
      </p>
      <div className="grid grid-cols-5 gap-8">
        {/* <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard /> */}
      </div>
    </section>
  );
};

export default BestSelling;
