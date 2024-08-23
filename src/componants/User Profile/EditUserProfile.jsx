import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import {
  updateUserEntityApi,
  uploadUserProfilePicApi,
} from "../Login&singup/userActionCreatore";
import { handleUserLogin } from "../redux/reducer/passwordReducer";
import { Bounce, toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import "./Edit.css";
const EditUserProfile = () => {
  const profilePicRef = useRef();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [userdetails, setUserdetails] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isslectedimage, setIsslectedimage] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const userdetailsList = useSelector(
    (state) => state.password_manager.userdetailsEntity
  );
  const userlogin = useSelector((state) => state.password_manager.userIsLogged);

  useEffect(() => {
    setUserdetails(userdetailsList);
  }, [userdetailsList]);

  const handleFileChange = useCallback((e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  }, []);

  const uploadImage = useCallback(() => {
    if (!selectedFile) {
      toast.error("Please select a file before uploading.");
      return;
    }

    const formdata = new FormData();
    formdata.append("file", selectedFile);
    setLoading(true);

    uploadUserProfilePicApi(id, formdata)
      .then((res) => {
        if (res.status === 200) {
          dispatch(handleUserLogin(!userlogin));
          toast.success("Profile updated successfully!");
          setSelectedFile(null);
        } else {
          toast.error("Failed to update profile. Please try again.");
        }
      })
      .catch((e) => {
        console.error(e);
        toast.error("An error occurred while uploading the profile picture.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedFile, id, dispatch]);

  const handleChangingButton = () => {
    profilePicRef.current.click();
  };

  const ProfileSchema = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  // const [duplicateUserdata, setDuplicateUserdata] = useState()

  //    useEffect(() => {
  //     if (editProfile) {
  //       setDuplicateUserdata(JSON.parse(JSON.stringify(userdetails[0])));

  //     }
  //    }, [editProfile])

  return (
    <>
      <div className="mt-4 h-screen w-full">
        {userdetails &&
          userdetails.map((Udetails) => (
            <div className="w-full" key={Udetails.id}>
              <div className="relative mb-3">
                {Udetails ? (
                  <div className="md:flex justify-between items-center">
                    <div className="flex justify-center md:justify-start items-end relative">
                      <div className="w-[20vw] h-[20vw] mb-2 shadow-md rounded-[50%] overflow-hidden bg-[#88e3f528]">
                        <img
                          className="w-full h-full object-contain rounded-full"
                          src={Udetails.profilePictureUrl}
                          alt="Profile Picture"
                        />
                        <div className="absolute bottom-0 right-0">
                          <input
                            type="file"
                            hidden
                            ref={profilePicRef}
                            id="profile"
                            onChange={handleFileChange}
                          />
                          {!selectedFile ? (
                            <button
                              className="p-2 px-4 w-29 rounded-md transition-all dark:bg-white cursor-pointer dark:text-black bg-black text-white font-bold"
                              onClick={() => profilePicRef.current.click()}
                            >
                              Change Avatar
                            </button>
                          ) : (
                            <button
                              onClick={uploadImage}
                              className="ml-4 p-2 px-4 rounded-md transition-all dark:bg-white cursor-pointer dark:text-black bg-black text-white font-bold"
                              disabled={loading}
                            >
                              {loading ? "Saving..." : "Save"}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="showonmd">
                      <Formik
                        initialValues={{
                          id: Udetails.id,
                          first_name: Udetails.first_name,
                          last_name: Udetails.last_name,
                          email: Udetails.email,
                          password: Udetails.password,
                        }}
                        validationSchema={ProfileSchema}
                        onSubmit={(values) => {
                          const { id } = Udetails;

                          updateUserEntityApi(id, values)
                            .then((res) => {
                              console.log(res);
                              if (res.status === 200) {
                                toast.update("User updated");
                              }
                            })
                            .catch((e) => {
                              console.log(e);
                            });
                        }}
                      >
                        {({ errors, touched }) => (
                          <Form className="mt-3 p-5 relative">
                            <div className="readonlyform text-xl flex justify-center gap-5">
                              <div>
                                <div className="flex flex-col gap-2">
                                  <label>First Name</label>
                                  <Field
                                    name="first_name"
                                    className={`w-fit p-2 ${
                                      editProfile
                                        ? "bg-white"
                                        : "read-only:bg-slate-50"
                                    } dark:text-black outline-none rounded-md`}
                                    type="text"
                                    readOnly={!editProfile}
                                  />
                                  {errors.first_name && touched.first_name ? (
                                    <div className="text-red-500">
                                      {errors.first_name}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="flex flex-col gap-2">
                                  <label>Last Name</label>
                                  <Field
                                    name="last_name"
                                    className={`w-fit p-2 ${
                                      editProfile
                                        ? "bg-white"
                                        : "read-only:bg-slate-50"
                                    } dark:text-black outline-none rounded-md`}
                                    type="text"
                                    readOnly={!editProfile}
                                  />
                                  {errors.last_name && touched.last_name ? (
                                    <div className="text-red-500">
                                      {errors.last_name}
                                    </div>
                                  ) : null}
                                </div>
                              </div>

                              <div>
                                <div className="flex flex-col gap-2">
                                  <label>Email</label>
                                  <Field
                                    name="email"
                                    className={`w-fit p-2 ${
                                      editProfile
                                        ? "bg-white"
                                        : "read-only:bg-slate-50"
                                    } dark:text-black outline-none rounded-md`}
                                    type="email"
                                    readOnly={!editProfile}
                                  />
                                  {errors.email && touched.email ? (
                                    <div className="text-red-500">
                                      {errors.email}
                                    </div>
                                  ) : null}
                                </div>

                                <div className="flex flex-col gap-2">
                                  <label>Password</label>
                                  <Field
                                    name="password"
                                    className={`w-fit p-2 ${
                                      editProfile
                                        ? "bg-white"
                                        : "read-only:bg-slate-50"
                                    } dark:text-black outline-none rounded-md`}
                                    type="password"
                                    readOnly={!editProfile}
                                  />
                                  {errors.password && touched.password ? (
                                    <div className="text-red-500">
                                      {errors.password}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>

                            {/* Toggle Button */}
                            <div className="absolute top-0 right-10 flex items-center gap-5">
                              <h1 className="font-bold text-xl text-blue-500">
                                Edit
                              </h1>
                              <label
                                htmlFor="edittoggle"
                                className="relative flex items-center cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  id="edittoggle"
                                  className="sr-only"
                                  onChange={() => setEditProfile(!editProfile)}
                                  checked={editProfile}
                                />
                                <div className="block bg-gray-300 w-14 h-8 rounded-full"></div>
                                <div
                                  className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                                    editProfile ? "translate-x-6" : ""
                                  }`}
                                ></div>
                              </label>
                            </div>

                            {editProfile && (
                              <button
                                type="submit"
                                className="mt-5 bg-black text-white dark:bg-white dark:text-black font-bold p-2 rounded-md"
                              >
                                Save Changes
                              </button>
                            )}
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <span className="w-full h-full object-contain rounded-full"></span>
                    <input
                      type="file"
                      hidden
                      id="profileUpdate"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="profileUpdate"
                      className="absolute bottom-10 z-10 right-8 -rotate-12 cursor-pointer"
                    >
                      <script src="https://cdn.lordicon.com/lordicon.js"></script>
                      <lord-icon
                        src="https://cdn.lordicon.com/wuvorxbv.json"
                        trigger="hover"
                        delay="1500"
                        stroke="bold"
                        state="in-reveal"
                        colors="primary:#104891,secondary:#1663c7"
                        style={{ width: "4rem", height: "3rem" }}
                      ></lord-icon>
                    </label>
                  </div>
                )}
              </div>
              <hr />

              <div className="showonsm hidden">
                <Formik
                  initialValues={{
                    first_name: Udetails.first_name,
                    last_name: Udetails.last_name,
                    email: Udetails.email,
                    password: Udetails.password,
                  }}
                  validationSchema={ProfileSchema}
                  onSubmit={(values) => {
                    const { id } = Udetails;

                    updateUserEntityApi(id, values)
                      .then((res) => {
                        console.log(res);
                        if (res.status === 200) {
                          toast.update("User updated");
                        }
                      })
                      .catch((e) => {
                        console.log(e);
                      });
                  }}
                >
                  {({ errors, touched }) => (
                    <Form className="mt-3 p-5 relative">
                      <div className="readonlyform text-xl flex justify-center gap-5">
                        <div>
                          <div className="flex flex-col gap-2">
                            <label>First Name</label>
                            <Field
                              name="first_name"
                              className={`w-fit p-2 ${
                                editProfile
                                  ? "bg-white"
                                  : "read-only:bg-slate-50"
                              } dark:text-black outline-none rounded-md`}
                              type="text"
                              readOnly={!editProfile}
                            />
                            {errors.first_name && touched.first_name ? (
                              <div className="text-red-500">
                                {errors.first_name}
                              </div>
                            ) : null}
                          </div>
                          <div className="flex flex-col gap-2">
                            <label>Last Name</label>
                            <Field
                              name="last_name"
                              className={`w-fit p-2 ${
                                editProfile
                                  ? "bg-white"
                                  : "read-only:bg-slate-50"
                              } dark:text-black outline-none rounded-md`}
                              type="text"
                              readOnly={!editProfile}
                            />
                            {errors.last_name && touched.last_name ? (
                              <div className="text-red-500">
                                {errors.last_name}
                              </div>
                            ) : null}
                          </div>
                        </div>

                        <div>
                          <div className="flex flex-col gap-2">
                            <label>Email</label>
                            <Field
                              name="email"
                              className={`w-fit p-2 ${
                                editProfile
                                  ? "bg-white"
                                  : "read-only:bg-slate-50"
                              } dark:text-black outline-none rounded-md`}
                              type="email"
                              readOnly={!editProfile}
                            />
                            {errors.email && touched.email ? (
                              <div className="text-red-500">{errors.email}</div>
                            ) : null}
                          </div>

                          <div className="flex flex-col gap-2">
                            <label>Password</label>
                            <Field
                              name="password"
                              className={`w-fit p-2 ${
                                editProfile
                                  ? "bg-white"
                                  : "read-only:bg-slate-50"
                              } dark:text-black outline-none rounded-md`}
                              type="password"
                              readOnly={!editProfile}
                            />
                            {errors.password && touched.password ? (
                              <div className="text-red-500">
                                {errors.password}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>

                      {/* Toggle Button */}
                      <div className="absolute top-0 right-10 flex items-center gap-5">
                        <h1 className="font-bold text-xl text-blue-500">
                          Edit
                        </h1>
                        <label
                          htmlFor="edittoggle"
                          className="relative flex items-center cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            id="edittoggle"
                            className="sr-only"
                            onChange={() => setEditProfile(!editProfile)}
                            checked={editProfile}
                          />
                          <div className="block bg-gray-300 w-14 h-8 rounded-full"></div>
                          <div
                            className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                              editProfile ? "translate-x-6" : ""
                            }`}
                          ></div>
                        </label>
                      </div>

                      {editProfile && (
                        <button
                          type="submit"
                          className="mt-5 bg-black text-white dark:bg-white dark:text-black font-bold p-2 rounded-md"
                        >
                          Save Changes
                        </button>
                      )}
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          ))}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  );
};

export default memo(EditUserProfile);
