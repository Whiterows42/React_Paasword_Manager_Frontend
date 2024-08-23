import React, { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { userdetailsEnityApi } from "../Login&singup/userActionCreatore";
import {
  handleDarkmode,
  handleUserDetailsEntity,
} from "../redux/reducer/passwordReducer";

const Header = () => {
  const [islogin, setIslogin] = useState(false);

  const dispatch = useDispatch();
  const userlogin = useSelector((state) => state.password_manager.userIsLogged);
  useEffect(() => {
    setIslogin(userlogin);
  }, [userlogin]);

  const [userdetailslist, setUserdetailslist] = useState([]);
  useEffect(() => {
    const email = localStorage.getItem("email");

    if (email) {
      setIslogin(true);
      userdetailsEnityApi(email).then((res) => {
        if (res.status === 200) {
          dispatch(handleUserDetailsEntity(res.data));
        }
      });
    }
  }, [islogin, userlogin]);

  const userdetials = useSelector(
    (state) => state.password_manager.userdetailsEntity
  );
  const detectDarkmode = useSelector(
    (state) => state.password_manager.darkmode
  );

  useEffect(() => {
    setUserdetailslist(userdetials);
  }, [userdetials]);

  const [darkMode, setDarkMode] = useState(() => {
    // Load darkMode state from localStorage or default to false
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme === true;
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme) {
      setDarkMode(savedTheme === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    dispatch(handleDarkmode(darkMode));
  }, [darkMode]);

  const [showProfileTab, setShowProfileTab] = useState(false);

  const navigate = useNavigate();
  const loginNavigate = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const logoutNavigate = useCallback(() => {
    setIslogin(false);
    localStorage.clear();
    navigate("/login");
  }, [navigate]);

  return (
    <div className="flex justify-between shadow sticky p-2 dark:bg-[#1D1E22] dark:text-white rounded-md bg-[#F0F4F8] transition-all top-0 z-30">
      <div className="brandname flex items-center">
        <div className="svg w-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            w-tid="11"
          >
            <path
              d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"
              w-tid="12"
            ></path>
          </svg>
        </div>
        <h1 className="text-[2vw] font-bold tracking-widest font-mono first-letter:text-[3vw]">
          SecureVault
        </h1>
      </div>

      <nav>
        <ul className="flex gap-4 text-[2vw] md:text-xl items-center ">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500  transition-all"
                  : "text-black  dark:text-white hover:text-blue-500 transition-all "
              }
              to={"/"}
            >
              <span>Home</span>
            </NavLink>
          </li>
          <li className="flex items-center cursor-pointer">
            <input
              onChange={() => setDarkMode(!darkMode)}
              type="checkbox"
              id="toggle"
            />
            <label id="switch" htmlFor="toggle">
              <div
                className={`${darkMode ? "left-[0.06rem]" : "left-0"}`}
                id="circle"
              ></div>
            </label>
          </li>
          {islogin ? (
            <li
              className="cursor-pointer"
              onMouseEnter={() => setShowProfileTab(true)}
              onMouseLeave={() => setShowProfileTab(false)}
            >
              <div className="icon relative ">
                <div>
                  {/* <lord-icon
                    src="https://cdn.lordicon.com/dxjqoygy.json"
                    trigger="hover"
                    colors="primary:#3B82F6,secondary:#3B82F6"
                    style={{
                      width: "4rem",
                      height: "4rem",
                      background: "#daf9ff",
                      borderRadius: "50%",
                    }}
                  ></lord-icon> */}
                  {userdetailslist && userdetailslist ? (
                    userdetailslist.map((img) => (
                      <div className=" w-[4rem] h-[4rem]  border border-blue-400  rounded-full overflow-hidden flex  ">
                        <img
                          className=" w-full h-full object-contain"
                          style={{
                            borderRadius: "50%",
                          }}
                          src={img.profilePictureUrl}
                          alt=""
                        />
                      </div>
                    ))
                  ) : (
                    <lord-icon
                      src="https://cdn.lordicon.com/dxjqoygy.json"
                      trigger="hover"
                      colors="primary:#3B82F6,secondary:#3B82F6"
                      style={{
                        width: "4rem",
                        height: "4rem",
                        background: "#daf9ff",
                        borderRadius: "50%",
                      }}
                    ></lord-icon>
                  )}
                </div>
                {showProfileTab && userdetailslist.length > 0
                  ? userdetailslist.map((details) => (
                      <div
                        key={details.id}
                        className="profile shadow-md absolute dark:bg-black dark:text-white mt-3 transition-all right-0 bg-white rounded-lg p-4 "
                      >
                        <div className="useremail flex gap-2 mb-2 items-center ">
                          {details?.profilePictureUrl.length - 1 < 0 ? (
                            <div className="relative">
                              <lord-icon
                                src="https://cdn.lordicon.com/dxjqoygy.json"
                                trigger="hover"
                                colors="primary:#3B82F6,secondary:#3B82F6"
                                style={{
                                  width: "4rem",
                                  height: "4rem",
                                  background: "#daf9ff",
                                  borderRadius: "50%",
                                }}
                              ></lord-icon>
                              <span
                                onClick={() =>
                                  navigate(`/edit_profile/${details.id}`)
                                }
                                className="absolute pointer-events-none left-0 w-full opacity-0 hover:block h-[89%]  bg-gray-900   rounded-full"
                              ></span>
                            </div>
                          ) : (
                            // <lord-icon
                            //   src="https://cdn.lordicon.com/dxjqoygy.json"
                            //   trigger="hover"
                            //   colors="primary:#3B82F6,secondary:#3B82F6"
                            //   style={{
                            //     width: "4rem",
                            //     height: "4rem",
                            //     background: "#daf9ff",
                            //     borderRadius: "50%",
                            //   }}
                            // ></lord-icon>

                            <div className=" w-[4rem] h-[4rem]  border border-blue-400  rounded-full overflow-hidden flex  ">
                              <img
                                className=" w-full h-full object-contain"
                                style={{
                                  borderRadius: "50%",
                                }}
                                src={details.profilePictureUrl}
                                alt=""
                              />
                            </div>
                          )}

                          <div>
                            <h3 className="hover:text-blue-400">
                              {details.email}
                            </h3>
                            <p className="text-gray-500 hover:text-blue-400 text-sm">
                              Free Plan
                            </p>
                          </div>
                        </div>

                        <div className="shadow-inner px-2 pt-4 mb-3">
                          <ul className="flex  flex-col gap-4">
                            <li className="flex items-center gap-2">
                              <lord-icon
                                src="https://cdn.lordicon.com/wyqtxzeh.json"
                                trigger="hover"
                                stroke="bold"
                                colors="primary:#3B82F6,secondary:#3B82F6"
                                style={{ width: "2rem", height: "2rem" }}
                              ></lord-icon>
                              <span></span> Upgrade to pro
                            </li>
                            <li className="flex items-center gap-2">
                              <Link
                                to={"/pass_manager"}
                                style={{ textDecoration: "none" }}
                                className="flex text-black dark:text-white items-center gap-2 "
                              >
                                <lord-icon
                                  src="https://cdn.lordicon.com/ghhwiltn.json"
                                  trigger="hover"
                                  stroke="bold"
                                  colors="primary:#3B82F6,secondary:#3B82F6"
                                  style={{ width: "2rem", height: "2rem" }}
                                ></lord-icon>
                                <span></span> Passwords
                              </Link>
                            </li>
                            <li className="flex gap-4 items-center">
                              <lord-icon
                                src="https://cdn.lordicon.com/lecprnjb.json"
                                trigger="hover"
                                colors="primary:#3B82F6,secondary:#3B82F6"
                                style={{ width: "2rem", height: "2rem" }}
                              ></lord-icon>

                              <Link
                                className="text-inherit dark:text-white"
                                to={`/edit_profile/${details.id}`}
                              >
                                Setting
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="logout shadow-inner flex gap-2 items-center px-2 py-1">
                          <div className="flex" style={{ rotate: "90deg" }}>
                            <lord-icon
                              src="https://cdn.lordicon.com/dxnllioo.json"
                              trigger="hover"
                              stroke="bold"
                              colors="primary:#3B82F6,secondary:#3B82F6"
                              style={{ width: "2rem", height: "2rem" }}
                            ></lord-icon>
                          </div>
                          <Link className="text-inherit dark:text-white">
                            <h3 onClick={logoutNavigate} className="p-2">
                              Log out
                            </h3>
                          </Link>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            </li>
          ) : (
            <li
              onClick={() => loginNavigate()}
              className="bg-blue-500 p-2 cursor-pointer rounded-md text-white font-bold"
            >
              Log in
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default memo(Header);
