const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="group relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      {/* Enhanced background pattern - visible by default */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-primary/8 opacity-30 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Icon container with enhanced styling */}
      <div className="relative z-10 p-6">
        <div className="flex flex-row items-start gap-6">
          {/* Enhanced icon container - more visible by default */}
          <div className="relative">
            <div className="w-16 h-16 sm:w-18 sm:h-18 p-3 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/25 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
              <div className="text-primary group-hover:text-primary/80 transition-colors duration-300">
                {icon}
              </div>
            </div>
            {/* Enhanced glow effect - visible by default */}
            <div className="absolute inset-0 w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br from-primary/25 to-transparent blur-xl opacity-20 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Content with enhanced typography */}
          <div className="flex flex-col gap-3 flex-1">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 group-hover:text-primary transition-colors duration-300 leading-tight">
              {title}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed w-full 2xl:w-11/12 group-hover:text-gray-700 transition-colors duration-300">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom accent line - visible by default with reduced opacity */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/30 via-primary to-primary/30 opacity-60 group-hover:opacity-100 group-hover:scale-x-100 transition-all duration-500 origin-left scale-x-75" />

      {/* Subtle top-right accent - visible by default */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/8 to-transparent rounded-full opacity-40 group-hover:opacity-100 transition-opacity duration-700" />
    </div>
  );
};

export default FeatureCard;
