const Spinner = ({ size = 40, className = "" }) => {
  return (
    <div
      className={`flex justify-center items-center h-full w-full ${className} col-span-full`}
    >
      <div
        className="animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"
        style={{ width: size, height: size }}
      />
    </div>
  );
};

export default Spinner;
