import React from "react";
import { Home, Search, AlertTriangle } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../../shadcn/button";

const NotFoundSection = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Icon */}
        <div className="mx-auto w-32 h-32 bg-red-100 rounded-full flex items-center justify-center mb-8">
          <AlertTriangle className="w-20 h-20 text-red-600" />
        </div>

        {/* Main Error Message */}
        <h1 className="text-6xl sm:text-8xl font-black text-gray-800 mb-4">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-4">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-lg sm:text-xl mb-8 leading-relaxed max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist. It might have been
          moved, deleted, or you entered the wrong URL.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link to="/">
            <Button
              size="lg"
              className="cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2"
            >
              <Home className="w-5 h-5" />
              Go Back Home
            </Button>
          </Link>
        </div>

        {/* Helpful Tips */}
        <div className="bg-white rounded-xl p-6 shadow-lg max-w-lg mx-auto">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Need Help?
          </h3>
          <div className="text-sm text-gray-600 space-y-2 text-left">
            <p>• Check the URL for typos</p>
            <p>• Use the search bar to find what you're looking for</p>
            <p>• Browse our categories and products</p>
            <p>• Contact our support team if you need assistance</p>
          </div>
        </div>

        {/* Support Contact */}
        <p className="text-sm text-gray-500 mt-8">
          Still can't find what you're looking for?{" "}
          <Link
            to="/contact"
            className="text-blue-600 font-medium hover:underline"
          >
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFoundSection;
