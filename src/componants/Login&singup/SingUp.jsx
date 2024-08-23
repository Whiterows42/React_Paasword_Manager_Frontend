import React, { memo, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserEntityApi } from "./userActionCreatore"; // Custom API call
import { Link, useNavigate } from "react-router-dom";
import formpsd from "./SignupBG.svg";
import "./Singup.css";
const SignUp = () => {
  const [loading, setLoading] = useState(false);

  // Formik setup for form state and validation

  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      profilePictureUrl:"",
    },
    validationSchema: Yup.object().shape({
      first_name: Yup.string()
        .trim()
        .min(2, "Minimum 2 characters")
        .matches(/^[A-Za-z ]*$/, "Special characters not allowed")
        .required("First name is required"),
      last_name: Yup.string()
        .trim()
        .min(2, "Minimum 2 characters")
        .matches(/^[A-Za-z ]*$/, "Special characters not allowed")
        .required("Last name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .matches(
          /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/,
          "Invalid Gmail address"
        )
        .required("Valid Gmail is required"),
      password: Yup.string()
        .trim()
        .min(6, "Minimum 6 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[a-zA-Z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{6,}$/,
          "Password must be strong"
        )
        .required("Password is required"),
    }),
    onSubmit: async (values, actions) => {
      try {
        setLoading(true);
        
        const response = await createUserEntityApi(values);

        if (response.status === 200) {
          toast.success("Sign Up Successful");
          navigate("/login");
        }
        if (response.status === 208) {
          toast.error("Email already exists");
        }

        // Set email in local storage after successful sign up
        localStorage.setItem("email", values.email);
        actions.resetForm();
      } catch (error) {
        toast.error("An error occurred. Please try again.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div>
      <div className="h-screen bg-white dark:bg-black dark:text-white rounded-md ">
        <div className="formcontent">
          <div className="img   flex justify-between">
            <div className="info   p-4 flex flex-col justify-center items-center">
              <h1 className="text-blue-500 text-end text-4xl font-bold">
                Forge Your Digital Fortress
              </h1>
              <div className="lists mt-5">
                <h2 className="text-gray-400 text-2xl ">
                  Why sign up for SecureVault?
                </h2>
                <ul className="mt-3 pl-5">
                  <li className="flex items-center gap-3">
                    {" "}
                    <span>
                      <lord-icon
                        src="https://cdn.lordicon.com/cgzlioyf.json"
                        trigger="hover"
                        stroke="bold"
                        colors="primary:#109173"
                        style={{ width: "1.5rem", height: "1,5rem" }}
                      ></lord-icon>
                    </span>{" "}
                    <span className="text-lg">
                      {" "}
                      Unbreakable encryption for all your passwords{" "}
                    </span>{" "}
                  </li>
                  <li className="flex items-center gap-3">
                    {" "}
                    <span>
                      <lord-icon
                        src="https://cdn.lordicon.com/cgzlioyf.json"
                        trigger="hover"
                        stroke="bold"
                        colors="primary:#109173"
                        style={{ width: "1.5rem", height: "1,5rem" }}
                      ></lord-icon>
                    </span>{" "}
                    <span className="text-lg">
                      {" "}
                      Seamless syncing across all your devices
                    </span>{" "}
                  </li>
                  <li className="flex items-center gap-3">
                    {" "}
                    <span>
                      <lord-icon
                        src="https://cdn.lordicon.com/cgzlioyf.json"
                        trigger="hover"
                        stroke="bold"
                        colors="primary:#109173"
                        style={{ width: "1.5rem", height: "1,5rem" }}
                      ></lord-icon>
                    </span>{" "}
                    <span> Easy-to-use password generator</span>{" "}
                  </li>
                  <li className="flex items-center gap-3">
                    {" "}
                    <span>
                      <lord-icon
                        src="https://cdn.lordicon.com/cgzlioyf.json"
                        trigger="hover"
                        stroke="bold"
                        colors="primary:#109173"
                        style={{ width: "1.5rem", height: "1,5rem" }}
                      ></lord-icon>
                    </span>{" "}
                    <span className="text-lg">
                      {" "}
                      Secure sharing with trusted contacts
                    </span>{" "}
                  </li>
                  <li className="flex items-center gap-3">
                    {" "}
                    <span>
                      <lord-icon
                        src="https://cdn.lordicon.com/cgzlioyf.json"
                        trigger="hover"
                        stroke="bold"
                        colors="primary:#109173"
                        style={{ width: "1.5rem", height: "1,5rem" }}
                      ></lord-icon>
                    </span>{" "}
                    <span className="text-lg">
                      {" "}
                      Two-factor authentication for enhanced security
                    </span>{" "}
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative">
              <img className="w-[100vh]" src={formpsd} alt="" />

              <div className="singupform absolute   right-64 top-40 w-[30vw] ">
                <form
                  onSubmit={formik.handleSubmit}
                  className=" flex flex-col gap-2 dark:text-black bg-blue-400 p-3  md:p-10 rounded-lg"
                >
                  <h1 className="text-center text-xl font-bold font-serif tracking-wide">
                    Sing up
                  </h1>
                  <div className="flex flex-col ">
                    <input
                      name="first_name"
                      type="text"
                      placeholder="Enter first name"
                      onChange={formik.handleChange}
                      value={formik.values.first_name}
                      className="border rounded p-2"
                    />
                    {formik.touched.first_name && formik.errors.first_name && (
                      <span className="text-red-600 text-sm">
                        {formik.errors.first_name}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col space-y-2">
                    <input
                      name="last_name"
                      type="text"
                      placeholder="Enter last name"
                      onChange={formik.handleChange}
                      value={formik.values.last_name}
                      className="border rounded p-2"
                    />
                    {formik.touched.last_name && formik.errors.last_name && (
                      <span className="text-red-600 text-sm">
                        {formik.errors.last_name}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col space-y-2">
                    <input
                      name="email"
                      type="text"
                      placeholder="Enter email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      className="border rounded p-2"
                    />
                    {formik.touched.email && formik.errors.email && (
                      <span className="text-red-600 text-sm">
                        {formik.errors.email}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col space-y-2">
                    <input
                      name="password"
                      type="password"
                      placeholder="Enter password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      className="border rounded p-2"
                    />
                    {formik.touched.password && formik.errors.password && (
                      <span className="text-red-600 text-sm">
                        {formik.errors.password}
                      </span>
                    )}
                  </div>
                  <div>
                    <p>
                      Already have an account ?
                      <Link className="text-blue-700" to={"/login"}>
                        {" "}
                        login{" "}
                      </Link>
                    </p>
                  </div>
                  <button
                    type="submit"
                    // disabled={!(formik.isValid && formik.dirty && !loading)}
                    className={`w-full py-2 px-4 bg-blue-700 disabled:bg-blue-400 font-bold text-white rounded-md flex items-center justify-center gap-2 text-xl ${
                      loading ? "opacity-50" : ""
                    }`}
                  >
                    {loading ? "Submitting..." : "Register"}
                    <lord-icon
                      src="https://cdn.lordicon.com/jgnvfzqg.json"
                      trigger="hover"
                      colors="primary:#fff,secondary:#fff"
                    ></lord-icon>
                  </button>
                </form>
              </div>
            </div>
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
    </div>
  );
};

export default memo(SignUp);
