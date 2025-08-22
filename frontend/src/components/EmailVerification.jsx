import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from "../features/auth/authSlice";
import { useNavigate, useParams } from "react-router";

const EmailVerification = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const { isLoading, error, success } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(verifyEmail(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/auth/login");
      }, 3000);

      return () => clearTimeout(timer); // cleanup
    }
  }, [success, navigate]);

  let innerText = "Token Verified! Redirecting to login page";
  if (isLoading) {
    innerText = "Verifying your email. Please wait...";
  } else if (error) {
    innerText = error;
  }

  return (
    <div className="bg-background flex justify-center items-center w-full min-h-screen">
      {innerText}
    </div>
  );
};

export default EmailVerification;
