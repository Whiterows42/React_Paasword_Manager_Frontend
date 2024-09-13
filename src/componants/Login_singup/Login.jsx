import React, { memo, useEffect, useState } from "react";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  forgottenPasswordApi,
  loginEntityApi,
  resendOtpApi,
  verifyOtpApi,
} from "./userActionCreatore"; // Make sure this function returns a Promise
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleUserLogin } from "../redux/reducer/passwordReducer";
import eyecloseicon from "./icons/eyeclose.svg";
import eyeopen from "./icons/eyeopen.svg";
import OptBox from "./OtpBox";
const Login = () => {


  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  
  const handleOnChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [darkMode, setDarkMode] = useState(false);

  const [showOtpBox, setshowOtpBox] = useState(false);

  const detectDarkmode = useSelector(
    (state) => state.password_manager.darkmode
  );

  useEffect(() => {
    setDarkMode(detectDarkmode);
  }, [detectDarkmode]);

  const [loading, setLoading] = useState(false);
  const [showpassicon, setShowpassicon] = useState(false);
  const [otptiming, setOtptiming] = useState(false);
  const [showforgotpassui, setShowforgotpassui] = useState(false)
  const [Forgottenpasswordotpsend, setForgottenpasswordotpsend] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { email, password } = user;

      const response = await loginEntityApi(email, password);

      if (response.status === 200) {
        toast.success("Otp Send successfully");
        const { jwtToken, username } = response.data;
        console.log(response.data);
        localStorage.setItem("token", "Bearer " + jwtToken);
        localStorage.setItem("username", username);
        setshowOtpBox(true);
        setOtptiming(true);
      } else if (response.status === 401) {
        toast.error("Invalid credentials");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Invalid credentials");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };
  const [timingCounter, setTimingCounter] = useState("");
  const [resendOtp, setResendOtp] = useState(false);
  useEffect(() => {
    let timerId;
    if (otptiming) {
      let second = 0;
      let min = 1; // Start with 1 minute

      timerId = setInterval(() => {
        second--;
        if (second < 0 && min > 0) {
          second = 59;
          min--;
        }

        setTimingCounter(
          `${min < 10 ? "0" + min : min}:${second < 10 ? "0" + second : second}`
        );

        if (min === 0 && second === 0) {
          setOtptiming(false);
          setResendOtp(true); // Show the resend button when timer ends
          clearInterval(timerId);
        }
      }, 1000);
    }

    return () => clearInterval(timerId);
  }, [otptiming]);

const verifyOtp = async (e) => {
  console.log(e);
  
    const otpServiceDto = {
      email:user.email,
      otp:e
    }

  try {
    const res = await verifyOtpApi(otpServiceDto);

    if (res.status === 200) {
      dispatch(handleUserLogin(true));
      localStorage.setItem("email", user.email);
      toast.success("OTP verified successfully!");
      navigate("/pass_manager");
    } else if (res.status === 410) {
      console.log("OTP expired");
      toast.error("OTP expired");
    }
  } catch (error) {
    if (error.response && error.response.status === 410) {
      toast.error("OTP expired");
    } else {
      toast.error("An error occurred, please try again!");
    }
    console.log(error);
  }
};

const verifyForgottenOtp = async (e) => {
  console.log(e);

  const otpServiceDto = {
    email: user.email,
    otp: e,
  };

  try {
    const res = await verifyOtpApi(otpServiceDto);

    if (res.status === 200) {
     
      toast.success("OTP verified successfully!");
      setShowforgotpassui(false)
    } else if (res.status === 410) {
      console.log("OTP expired");
      toast.error("OTP expired");
    }
  } catch (error) {
    if (error.response && error.response.status === 410) {
      toast.error("OTP expired");
    } else {
      toast.error("An error occurred, please try again!");
    }
    console.log(error);
  }
};
  const handleResendOtp = async () => {
   

    setResendOtp(false);
    setTimingCounter("01:00");
    setOtptiming(true);
    const formData = new FormData();
    formData.append("email", user.email);
    resendOtpApi(formData)
      .then((res) => {
        if (res.status === 200) {
         toast.success("OTP Resent!");
         
        } else if (res.status === 410) {
          console.log("OTP expired");
          toast.error("OTP expired");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 410) {
          toast.error("OTP expired");
        } else {
          toast.error("Invalid OTP!");
        }
        console.log(error);
      });
  };

  // <button
  //   onClick={handleResendOtp}
  //   className="bg-blue-500 text-white rounded p-2 mt-4"
  // >
  //   Resend OTP
  // </button>;

const handleForgottenPassowrd = () => { 
  const {email} = user;
  const formData = new FormData();

  formData.append("email",email)
  forgottenPasswordApi(formData).then((res)=>{
    console.log(res);
    if (res.status === 200) {
      setForgottenpasswordotpsend(true)
    }
    
  })
 }


  return (
    <>
      <div className=" flex w-full dark:bg-[#1A1A1A] justify-center transition-all dark:text-white h-screen items-center px-2 ">
        {showforgotpassui ? (
          <>
            <div className="flex flex-col   justify-center rounded-md md:px-16  md:w-[50%]">
              {Forgottenpasswordotpsend ? (
                <div className="flex dark:bg-[#1c1b1b] gap-5 py-5 px-4 rounded-lg shadow-lg flex-col  items-center">
                  <h1 className=" text-3xl text-left font-bold ">Verify Otp</h1>
                  <p>Enter the 6-digit code sent to your email</p>
                  <OptBox lenght={6} onOtpSubmit={verifyForgottenOtp} />
                  <h1>{timingCounter}</h1>
                  {resendOtp ? (
                    <button
                      onClick={handleResendOtp}
                      className="p-2 px-4 rounded-md bg-black text-white dark:bg-white dark:text-black font-bold "
                    >
                      Resend
                    </button>
                  ) : null}
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-5">
                    <input
                      className="p-2 rounded-md outline-none"
                      name="email"
                      value={user.email}
                      type="email"
                      required
                      placeholder="enter email"
                      onChange={handleOnChange}
                    />
                    <button
                      onClick={handleForgottenPassowrd}
                      disabled={!user.email}
                      className="p-2 disabled:bg-blue-400 rounded-md bg-blue-600 text-white font-bold"
                    >
                      {" "}
                      Verify Email{" "}
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        ) : showOtpBox ? (
          <>
            <div className="flex flex-col   justify-center rounded-md md:px-16  md:w-[50%]">
              <div className="flex dark:bg-[#1c1b1b] gap-5 py-5 px-4 rounded-lg shadow-lg flex-col  items-center">
                <h1 className=" text-3xl text-left font-bold ">Verify Otp</h1>
                <p>Enter the 6-digit code sent to your email</p>
                <OptBox lenght={6} onOtpSubmit={verifyOtp} />
                <h1>{timingCounter}</h1>
                {resendOtp ? (
                  <button
                    onClick={handleResendOtp}
                    className="p-2 px-4 rounded-md bg-black text-white dark:bg-white dark:text-black font-bold "
                  >
                    Resend
                  </button>
                ) : null}
              </div>
            </div>
          </>
        ) : !showforgotpassui ? (
          <form
            onSubmit={handleLogin}
            className="bg-white dark:bg-[#2F3136] transition-all dark:text-white p-6 w-full rounded-md h-screen flex flex-col justify-center md:w-[50%] shadow-md "
          >
            <div className="flex justify-center mb-6">
              {/* Lordicon animated icon */}
              <lord-icon
                src="https://cdn.lordicon.com/dxjqoygy.json"
                trigger="hover"
                colors={` ${
                  darkMode
                    ? "primary:#fff,secondary:#fff"
                    : "primary:#3B82F6,secondary:#3B82F6"
                } `}
                style={{
                  width: "4rem",
                  height: "4rem",
                  background: "#daf9ff",
                  borderRadius: "50%",
                }}
              ></lord-icon>
            </div>
            <h2 className="text-2xl text-center font-bold mb-6">Login</h2>
            <div className="mb-4">
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Email"
                name="email"
                value={user.email}
                onChange={handleOnChange}
                required
              />
            </div>
            <div className="mb-4 relative">
              <input
                type={showpassicon ? "text" : "password"}
                name="password"
                className="w-full p-2 border border-gray-300 dark:text-black rounded-md"
                placeholder="Password"
                value={user.password}
                onChange={handleOnChange}
                required
              />
              {showpassicon ? (
                <img
                  className="w-10 z-10 absolute right-0 top-1 cursor-pointer"
                  src={eyeopen}
                  alt="llose eye"
                  onClick={() => setShowpassicon(!showpassicon)}
                />
              ) : (
                <img
                  className="w-10 z-10 absolute right-0 top-1 cursor-pointer"
                  src={eyecloseicon}
                  alt="llose eye"
                  onClick={() => setShowpassicon(!showpassicon)}
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <div className="mt-2  flex justify-between">
              <p>
                Dont have an account ?
                <Link to={"/singup"}> Create account </Link>
              </p>
              <button
                onClick={() => setShowforgotpassui(true)}
                className="text-blue-700 bg-transparent outline-none border-none"
              >
                Forgotten password
              </button>
            </div>
          </form>
        ) : null}

        <div className="right flex  w-[50%] transition-all rounded-md h-screen justify-center items-center text-white dark:bg-[#F0F4F8] dark:text-black bg-[#4A90E2]">
          <div className="w-[70%]">
            <h1 className=" text-center text-3xl font-bold">
              Protect Your Digital World
            </h1>

            <p className=" font-bold text-center">
              SecureVault safeguards your passwords and sensitive information
              with state-of-the-art encryption technology. Your digital life,
              secured
            </p>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        theme="dark"
        transition={Bounce}
      />
    </>
  );
};

export default memo(Login);
