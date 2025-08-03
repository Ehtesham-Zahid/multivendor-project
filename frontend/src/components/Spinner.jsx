const Spinner = ({ size = 40, className = "mx-auto" }) => {
  return (
    <div
      className={`animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 ${className}`}
      style={{ width: size, height: size }}
    />
  );
};
export default Spinner;
