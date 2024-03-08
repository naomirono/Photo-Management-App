import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import AppLoader from "../Loader/Loader";
import { GoogleLogin } from '@react-oauth/google';

const validateEmail = (email) => {
  // Add your email validation logic here
  return true;
};

const LandingPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('userToken');
    if (storedToken) {
      navigate("/home");
    }
  }, [navigate]);

  const handleGoogleLoginSuccess = (credentialResponse) => {
    localStorage.setItem('userToken', credentialResponse.credential);
    navigate("/home");
  };

  const handleGoogleLoginError = () => {
    console.log('Login Failed');
    navigate("/");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      console.error("All fields are required");
      return;
    }

    if (!validateEmail(email)) {
      console.error("Please enter a valid email");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      try {
        console.log("Authentication successful");
        navigate("/home");
      } catch (err) {
        console.error("Authentication failed:", err);
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen bg-white">

      <div className="relative flex justify-center items-center w-full sm:w-1/2 bg-cover bg-center h-screen" style={{ 
        backgroundImage: 'url("https://neyoportfolio.s3.eu-north-1.amazonaws.com/joanna-kosinska-spAkZnUleVw-unsplash.jpg")', 
        position: 'relative' 
      }}>
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
        <div className="max-w-2xl mx-auto text-center relative z-10 mt-5 sm:mt-0">
          <div className="flex flex-col items-center">
            <h1 className="text-5xl font-fira font-semibold text-white mb-6 sm:mt-8">
              Welcome to <span className="text-[var(--primary)]">Photo App</span>
            </h1>
            <p className="text-gray-200 mb-6 font-inter text-lg">
              Immerse yourself in a visual journey within our app. Explore user profiles, discover their unique albums, and dive into captivating photo collections.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full sm:w-1/2 flex justify-center items-center">
        <div className="sm:w-96 p-5">
          <div className="text-center">
            <h2 className="font-fira text-medium text-4xl text-[var(--secondary)]">
              Welcome Again
            </h2>
            <h2 className="mt-3 mb-10 text-[var(--secondary)]">
              Explore our photo collection
            </h2>
          </div>
          <form onSubmit={submitHandler}>
            <label
              htmlFor="email"
              className="text-[14px] font-inter text-[var(--tertiary)]"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
              required
              className="w-full rounded-lg placeholder-[var(--primary)] mb-5 border border-[#94a3b8] px-[12px] py-[8px]"
            />
            <label
              htmlFor="password"
              className="text-[14px] font-inter text-[var(--tertiary)] mt-10"
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={visible ? "text" : "password"}
                id="password"
                value={password}
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
                required
                className="w-full rounded-lg placeholder-[var(--primary)] border border-[#94a3b8] px-[12px] py-[8px] pr-[40px]"
              />
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
                onClick={() => setVisible(!visible)}
              >
                {visible ? (
                  <AiOutlineEye size={25} />
                ) : (
                  <AiOutlineEyeInvisible size={25} />
                )}
              </span>
            </div>

            <p className="text-sm text-[var(--primary)] text-right mt-3">
              <Link to="">Forgot Password?</Link>
            </p>
            <button
              type="submit"
              className="bg-[var(--primary)] text-white rounded-lg py-2 px-4 w-full mt-8"
              disabled={isLoading}
            >
              {isLoading ? <AppLoader /> : "Sign In"}
            </button>
          </form>

          <div className="mt-4 flex flex-col items-center">
              <p className="text-[var(--tertiary-dark)] text-sm mb-2">Or</p>
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginError}
              />
            </div>

          <p className="font-medium text-sm text-center mt-5 text-[var(--tertiary-dark)]">
            Already have an account?{" "}
            <Link to="" className="text-[var(--primary)]">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
