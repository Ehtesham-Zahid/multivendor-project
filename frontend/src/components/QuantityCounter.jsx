const QuantityCounter = () => {
  return (
    <div className="rounded-sm border-2 border-dark flex max-w-fit font-semibold text-lg">
      <p className="px-2.5 py-0.5 cursor-pointer ">-</p>
      <p className="px-2.5 py-0.5 text-sky-600">10</p>
      <p className="px-2.5 py-0.5 cursor-pointer">+</p>
    </div>
  );
};

export default QuantityCounter;
