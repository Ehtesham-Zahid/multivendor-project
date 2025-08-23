import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from "../features/auth/authSlice";
import { useParams, Link } from "react-router";
import { Button } from "../shadcn/button";
import { CheckCircle, XCircle, Loader2, Mail } from "lucide-react";

const EmailVerification = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const { isLoading, error, success } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(verifyEmail(token));
  }, [dispatch, token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 sm:p-10 text-center">
        {/* Loading State */}
        {isLoading && (
          <>
            <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
              Verifying Your Email
            </h1>
            <p className="text-gray-600 text-base sm:text-lg mb-8">
              Please wait while we verify your email address...
            </p>
          </>
        )}

        {/* Success State */}
        {success && (
          <>
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
              Email Verified Successfully!
            </h1>
            <p className="text-gray-600 text-base sm:text-lg mb-8">
              Congratulations! Your email has been verified. You can now log in
              to your account.
            </p>
            <Link to="/auth/login">
              <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2">
                <Mail className="w-5 h-5" />
                Login to Your Account
              </Button>
            </Link>
          </>
        )}

        {/* Error State */}
        {error && (
          <>
            <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
              Verification Failed
            </h1>
            <p className="text-gray-600 text-base sm:text-lg mb-6">{error}</p>
            <p className="text-gray-500 text-sm mb-8">
              The verification link may have expired or is invalid.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/auth/register" className="flex-1">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  Sign Up Again
                </Button>
              </Link>
              <Link to="/auth/login" className="flex-1">
                <Button
                  variant="outline"
                  className="w-full border-2 border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:border-gray-400"
                >
                  Try Login
                </Button>
              </Link>
            </div>
          </>
        )}

        {/* Additional Help */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Having trouble?{" "}
            <Link to="/" className="text-blue-600 font-medium hover:underline">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
