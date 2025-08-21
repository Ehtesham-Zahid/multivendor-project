import { ListOrdered, Phone, ShieldCheck, Star } from "lucide-react";
import FeatureCard from "../FeatureCard";

const FeaturesSection = () => {
  return (
    <div className="w-custom mx-auto my-20 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        <FeatureCard
          title="Fast Delivery"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
          icon={<ListOrdered className="text-black w-12 h-12" />}
        />
        <FeatureCard
          title="Secure Payment"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
          icon={<ShieldCheck className="text-black w-12 h-12" />}
        />
        <FeatureCard
          title="24/7 Support"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
          icon={<Phone className="text-black w-12 h-12" />}
        />
        <FeatureCard
          title="Best Quality"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
          icon={<Star className="text-black w-12 h-12" />}
        />
      </div>
    </div>
  );
};

export default FeaturesSection;
