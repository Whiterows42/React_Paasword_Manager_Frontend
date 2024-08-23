import React, { memo } from "react";

import reactLogo from "./icons/logo.svg";
import lock from "./icons/lock.svg"
import "./GetStartcss.css";
import { useNavigate } from "react-router-dom";
const GetStarted = () => {

  const navigate = useNavigate()
  const handleGetStarted = () => { 
    navigate("/pass_manager");
   }
  return (
    <div className=" getStarted dark:bg-black dark:text-white z-10 ">
      <section className="first_section flex justify-between items-center">
        <div className="left ">
          <div className="headingtext">
            <h1 className="text-4xl from-neutral-700 font-bold tracking-wide text-blue-500">
              Secure Your Digital Life
            </h1>
            <div className="content mt-4 mb-4">
              <div>
                <p className="text-black dark:text-white">
                  <span className="text-xl text-blue-500 font-bold font-sans">
                    SecureVault
                  </span>{" "}
                  is ultimate password manager that keeps your online accounts
                  safe and easily accessible.{" "}
                </p>
                <span>
                  Say goodbye to forgotten password and hello to peace of mind
                </span>{" "}
              </div>
            </div>
          </div>

          <button
            onClick={() => handleGetStarted()}
            className="bg-blue-500 text-white font-bold p-3 rounded-md px-4 w-fit outline-none shadow-lg"
          >
            Get Started Free
          </button>
        </div>
        <div className="right">
          <div className="logoimg w-full py-2 pr-10">
            <img className="w-[50vh]" src={reactLogo} alt="" />
          </div>
        </div>
      </section>

      <section className="secon_section mt-20">
        <div className="features flex  justify-between ">
          <div className="f1 dark:bg-gray-950 dark:text-white ff w-[30%] flex flex-col items-center text-center gap-4 bg-white  p-4 rounded-md shadow-md">
            <div className="icon w-14">
              {/* <img src={lock} alt="" /> */}
              <lord-icon
                src="https://cdn.lordicon.com/khheayfj.json"
                trigger="hover"
                stroke="bold"
                colors="primary:#104891,secondary:#1663c7"
                style={{ width: "5rem", height: "5rem" }}
              ></lord-icon>
            </div>
            <div className="name">
              <h2 className="text-blue-500 dark:text-white font-bold text-lg">
                Banking-level Encryption
              </h2>
            </div>
            <div className="fcontents text-black dark:text-white">
              <p>
                Your data is protected with AES-256 bit Encryption ensuring
                maximum security for all your sensitive information
              </p>
            </div>
          </div>
          <div className="f2 dark:bg-gray-950 dark:text-white ff w-[30%] flex flex-col items-center text-center gap-4 bg-white p-4 rounded-md shadow-md">
            <div className="icon w-14">
              {/* <img src={lock} alt="" /> */}
              <lord-icon
                src="https://cdn.lordicon.com/phkpravm.json"
                trigger="hover"
                stroke="bold"
                colors="primary:#104891,secondary:#1663c7"
                style={{ width: "5rem", height: "5rem" }}
              ></lord-icon>
            </div>
            <div className="name">
              <h2 className="text-blue-500 dark:text-white font-bold text-lg">
                Easy Passowrd Generation
              </h2>
            </div>
            <div className="fcontents text-black dark:text-white">
              <p>
                Creating Strong , Unique password with just one click . Never
                Worry about Weak password again
              </p>
            </div>
          </div>
          <div className="f3 ff dark:bg-gray-950 dark:text-white w-[30%] flex flex-col items-center text-center gap-4 bg-white  p-4 rounded-md shadow-md">
            <div className="icon w-14">
              {/* <img src={lock} alt="" /> */}
              <lord-icon
                src="https://cdn.lordicon.com/ladpszga.json"
                trigger="hover"
                stroke="bold"
                colors="primary:#3B82F6,secondary:#3B82F6"
                style={{ width: "5rem", height: "5rem" }}
              ></lord-icon>
            </div>
            <div className="name">
              <h2 className="text-blue-500 dark:text-white font-bold text-lg">
                Cross-Platform Sync
              </h2>
            </div>
            <div className="fcontents text-black dark:text-white">
              <p>
                Access your password seamlessly across all your devices -
                desktop,mobile and web
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default memo( GetStarted);
