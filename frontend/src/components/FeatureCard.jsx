const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="col-span-1  bg-gray-100 rounded-lg shadow-2xl p-6">
      <div className="flex flex-row items-start gap-5">
        <div className="w-14 sm:w-16 h-14 sm:h-16  p-2.5 mt-1.5  rounded-lg   flex  items-center justify-center bg-gray-200">
          {icon}
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl sm:text-2xl font-black">{title}</p>
          <p className="text-sm sm:text-md text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
