import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadUserProfilePicApi } from "../Login & singup/userActionCreatore";
import { handleUserLogin } from "../redux/reducer/passwordReducer";
import { Bounce, toast, ToastContainer } from "react-toastify";

import "./Edit.css";
const EditUserProfile = () => {
  const profilePicRef = useRef();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [userdetails, setUserdetails] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isslectedimage, setIsslectedimage] = useState(false)
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
   }
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
                    {!editProfile ? (
                      <div className="mt-3 p-5 showonmd relative">
                        <div className="readonlyform text-xl flex justify-center gap-5">
                          <div>
                            <div className="flex flex-col gap-2">
                              <label>First Name</label>
                              <input
                                readOnly
                                value={Udetails.first_name}
                                className="w-fit dark:text-black p-2 read-only:bg-slate-50 outline-none rounded-md"
                                type="text"
                              />
                            </div>
                            <div className="flex">
                              <div className="flex flex-col gap-2">
                                <label>Last Name</label>
                                <input
                                  readOnly
                                  value={Udetails.last_name}
                                  className="w-fit p-2 dark:text-black read-only:bg-slate-50 outline-none rounded-md"
                                  type="text"
                                />
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="flex flex-col gap-2">
                              <label>Email</label>
                              <input
                                readOnly
                                value={Udetails.email}
                                className="w-fit p-2 dark:text-black read-only:bg-slate-50 outline-none rounded-md"
                                type="email"
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <label>Password</label>
                              <input
                                readOnly
                                value={Udetails.password}
                                className="w-fit p-2 dark:text-black read-only:bg-slate-50 outline-none rounded-md"
                                type="password"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="absolute top-0 right-10 flex items-center gap-5">
                          <h1 className="font-bold text-xl text-blue-500">
                            Edit{" "}
                          </h1>
                          <label
                            htmlFor="edittoggle"
                            className="relative flex items-center cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              id="edittoggle"
                              className="sr-only" // This will hide the input visually but keep it accessible
                              onChange={() => setEditProfile(!editProfile)} // Assuming you want to toggle editProfile state
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
                      </div>
                    ) : (
                      <div className="mt-3 p-5 relative">
                        <div className="readonlyform text-xl flex justify-center gap-5">
                          <div>
                            <div className="flex flex-col gap-2">
                              <label>First Name</label>
                              <input
                                value={Udetails.first_name}
                                className="w-fit dark:text-black p-2 bg-white rounded-md"
                                type="text"
                              />
                            </div>
                            <div className="flex">
                              <div className="flex flex-col gap-2">
                                <label>Last Name</label>
                                <input
                                  value={Udetails.last_name}
                                  className="w-fit p-2 dark:text-black bg-white rounded-md"
                                  type="text"
                                />
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="flex flex-col gap-2">
                              <label>Email</label>
                              <input
                                value={Udetails.email}
                                className="w-fit p-2 dark:text-black  bg-white rounded-md"
                                type="email"
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <label>Password</label>
                              <input
                                value={Udetails.password}
                                className="w-fit p-2 dark:text-black  bg-white rounded-md"
                                type="password"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="absolute top-0 right-10 flex items-center gap-5">
                          <h1 className="font-bold text-xl text-blue-500">
                            Edit{" "}
                          </h1>
                          <label
                            htmlFor="edittoggle"
                            className="relative flex items-center cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              id="edittoggle"
                              className="sr-only" // This will hide the input visually but keep it accessible
                              onChange={() => setEditProfile(!editProfile)} // Assuming you want to toggle editProfile state
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
                      </div>
                    )}
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
                {!editProfile ? (
                  <div className="mt-3 p-5 relative">
                    <div className="readonlyform text-xl flex justify-center gap-5">
                      <div>
                        <div className="flex flex-col gap-2">
                          <label>First Name</label>
                          <input
                            readOnly
                            value={Udetails.first_name}
                            className="w-fit dark:text-black p-2 read-only:bg-slate-50 outline-none rounded-md"
                            type="text"
                          />
                        </div>
                        <div className="flex">
                          <div className="flex flex-col gap-2">
                            <label>Last Name</label>
                            <input
                              readOnly
                              value={Udetails.last_name}
                              className="w-fit p-2 dark:text-black read-only:bg-slate-50 outline-none rounded-md"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex flex-col gap-2">
                          <label>Email</label>
                          <input
                            readOnly
                            value={Udetails.email}
                            className="w-fit p-2 dark:text-black read-only:bg-slate-50 outline-none rounded-md"
                            type="email"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label>Password</label>
                          <input
                            readOnly
                            value={Udetails.password}
                            className="w-fit p-2 dark:text-black read-only:bg-slate-50 outline-none rounded-md"
                            type="password"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-0 right-10 flex items-center gap-5">
                      <h1 className="font-bold text-xl text-blue-500">Edit </h1>
                      <label
                        htmlFor="edittoggle"
                        className="relative flex items-center cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          id="edittoggle"
                          className="sr-only" // This will hide the input visually but keep it accessible
                          onChange={() => setEditProfile(!editProfile)} // Assuming you want to toggle editProfile state
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
                  </div>
                ) : (
                  <div className="mt-3 p-5 relative">
                    <div className="readonlyform text-xl flex justify-center gap-5">
                      <div>
                        <div className="flex flex-col gap-2">
                          <label>First Name</label>
                          <input
                            value={Udetails.first_name}
                            className="w-fit dark:text-black p-2 bg-white rounded-md"
                            type="text"
                          />
                        </div>
                        <div className="flex">
                          <div className="flex flex-col gap-2">
                            <label>Last Name</label>
                            <input
                              value={Udetails.last_name}
                              className="w-fit p-2 dark:text-black bg-white rounded-md"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex flex-col gap-2">
                          <label>Email</label>
                          <input
                            value={Udetails.email}
                            className="w-fit p-2 dark:text-black bg-white  rounded-md"
                            type="email"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label>Password</label>
                          <input
                            value={Udetails.password}
                            className="w-fit p-2 dark:text-black bg-white  rounded-md"
                            type="password"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-0 right-10 flex items-center gap-5">
                      <h1 className="font-bold text-xl text-blue-500">Edit </h1>
                      <label
                        htmlFor="edittoggle"
                        className="relative flex items-center cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          id="edittoggle"
                          className="sr-only" // This will hide the input visually but keep it accessible
                          onChange={() => setEditProfile(!editProfile)} // Assuming you want to toggle editProfile state
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
                  </div>
                )}
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
