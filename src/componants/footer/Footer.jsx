import React, { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Footer = () => {
  // useEffect(() => {
  //   const data = navigator.onLine;
  //   console.log(data);
  //   if (data) {
  //     toast.success("yur online");
  //   } else {
  //     toast("Your ofline");
  //   }
  // }, []);
  const [darkmode, setDarkmode] = useState(false)
  const detectDarkmode = useSelector(
    (state) => state.password_manager.darkmode
  ); 

useEffect(() => {
  setDarkmode(detectDarkmode)
}, [detectDarkmode])


  return (
    <>
      <div className=" flex mt-10 shadow-inner p-3 justify-between items-center dark:bg-[#1D1E22] rounded-md dark:text-white  text-black">
        <div className="flex gap-1">
          &copy; 2024
          <span className="hidden md:block">
            SecureVault. All righ reserved
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span>
            <lord-icon
              src="https://cdn.lordicon.com/vistbkts.json"
              trigger="hover"
              stroke="bold"
              colors={`${
                !darkmode
                  ? "primary:#fff,secondary:#ffff"
                  : "primary:#fff,secondary:#fff"
              } `}
              style={{ width: "2rem", height: "2rem" }}
            ></lord-icon>
          </span>
          <span> privacy policy </span>
        </div>
        <div className="flex gap-5">
          <div className="twitter">
            <lord-icon
              src="https://cdn.lordicon.com/ewswvzmw.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#104891,secondary:#1663c7"
              style={{ width: "2rem", height: "2rem" }}
            ></lord-icon>
          </div>
          <div className="feacbook ">
            <lord-icon
              src="https://cdn.lordicon.com/iqagrlso.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#104891,secondary:#1663c7"
              style={{ width: "2rem", height: "2rem" }}
            ></lord-icon>
          </div>
          <div className="linkdin">
            <lord-icon
              src="https://cdn.lordicon.com/mdyiqybm.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#104891,secondary:#1663c7"
              style={{ width: "2rem", height: "2rem" }}
            ></lord-icon>
          </div>
        </div>
      </div>
      {/* <ToastContainer
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
      /> */}
    </>
  );
}

export default memo( Footer)