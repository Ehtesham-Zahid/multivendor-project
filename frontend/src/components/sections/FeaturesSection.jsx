import { ListOrdered, Phone, ShieldCheck, Star } from "lucide-react";
import FeatureCard from "../FeatureCard";

const FeaturesSection = () => {
  return (
    <div className="w-custom mx-auto my-20 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        <FeatureCard
          title="Fast Delivery"
          description="We offer fast and reliable delivery services to ensure your products reach you in no time."
          icon={<ListOrdered className="text-black w-12 h-12" />}
        />
        <FeatureCard
          title="Secure Payment"
          description="We use the latest security measures to protect your payment information and ensure a safe shopping experience."
          icon={<ShieldCheck className="text-black w-12 h-12" />}
        />
        <FeatureCard
          title="24/7 Support"
          description="Our dedicated support team is available 24/7 to assist you with any questions or concerns you may have."
          icon={<Phone className="text-black w-12 h-12" />}
        />
        <FeatureCard
          title="Best Quality"
          description="We pride ourselves on offering the highest quality products to our customers."
          icon={<Star className="text-black w-12 h-12" />}
        />
      </div>
    </div>
  );
};

export default FeaturesSection;
