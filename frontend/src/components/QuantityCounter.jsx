const QuantityCounter = () => {
  return (
    <div className="border-primary border-3 text-lg flex font-bold w-fit rounded-md">
      <p className="bg-blue-200 py-2 px-3 cursor-pointer">+</p>
      <p className="px-3 py-2">100</p>
      <p className="bg-blue-200 py-2 px-3 cursor-pointer">-</p>
    </div>
  );
};

export default QuantityCounter;
