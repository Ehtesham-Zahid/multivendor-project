import ProductCard from "../ProductCard";

const BestSelling = () => {
  return (
    <section className="w-custom m-auto">
      <p className="text-center text-4xl font-bold tracking-wide my-16">
        Best Selling
      </p>
      <div className="grid grid-cols-5 gap-8">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </section>
  );
};

export default BestSelling;
