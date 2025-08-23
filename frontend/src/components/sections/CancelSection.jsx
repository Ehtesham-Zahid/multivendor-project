import React from "react";
import { XCircle, RefreshCw, Home } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../../shadcn/button";

const CancelSection = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 sm:p-10 text-center transform transition-all duration-300 hover:scale-105">
        {/* Error Icon */}
        <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <XCircle className="w-12 h-12 text-red-600" />
        </div>

        {/* Error Message */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          Payment Unsuccessful
        </h1>
        <p className="text-gray-600 text-base sm:text-lg mb-8 leading-relaxed">
          Something went wrong with your payment. Don't worry, your order hasn't
          been placed and no charges were made.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <Button
            onClick={() => window.history.back()}
            className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </Button>

          <Link to="/" className="flex-1">
            <Button className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer">
              <Home className="w-5 h-5" />
              Go Home
            </Button>
          </Link>
        </div>

        {/* Additional Info */}
        <div className="text-sm text-gray-500 space-y-2">
          <p>Having trouble? Here are some things to check:</p>
          <ul className="text-left text-xs space-y-1 mt-3">
            <li>• Ensure your card details are correct</li>
            <li>• Check if you have sufficient funds</li>
            <li>• Verify your billing address matches</li>
            <li>• Try a different payment method</li>
          </ul>
        </div>

        {/* Support Contact */}
        <p className="text-sm text-gray-500 mt-6">
          Need help? Contact our support team at{" "}
          <span className="text-blue-600 font-medium">
            support@swiftcart.com
          </span>
        </p>
      </div>
    </div>
  );
};

export default CancelSection;
