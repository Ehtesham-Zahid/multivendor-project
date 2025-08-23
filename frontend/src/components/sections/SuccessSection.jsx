import React, { useEffect } from "react";
import { CheckCircle, ShoppingBag } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../../shadcn/button";

const SuccessSection = () => {
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify([]));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 sm:p-10 text-center transform transition-all duration-300 hover:scale-105">
        {/* Success Icon */}
        <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>

        {/* Success Message */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          Thank you for ordering!
        </h1>
        <p className="text-gray-600 text-base sm:text-lg mb-8 leading-relaxed">
          Your order has been confirmed and is being processed. You will receive
          an email confirmation shortly.
        </p>

        {/* Continue Shopping Button */}
        <Link to="/">
          <Button className="w-full bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer">
            <ShoppingBag className="w-5 h-5" />
            Continue Shopping
          </Button>
        </Link>

        {/* Additional Info */}
        <p className="text-sm text-gray-500 mt-6">
          Need help? Contact our support team
        </p>
      </div>
    </div>
  );
};

export default SuccessSection;
