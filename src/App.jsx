import { memo, Suspense, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import Header from "./componants/Header/Header";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./componants/footer/Footer";
import { logedUserApi } from "./componants/Login_singup/userActionCreatore";
import LoadingSpinner from "./componants/loading_Spiner/LoadingSpinner";

function App() {
  const [count, setCount] = useState(0);
 const [loading, setLoading] = useState(true); 
  const navigate = useNavigate()
  useEffect(() => {
    async function checkUserLoggedIn() {
      try {
        const response = await logedUserApi(); // Your API call

        // If the response is OK (status 200)
        if (response.status === 200) {
          console.log("User is logged in");
        }
      } catch (error) {
        // Check if error is a 401 Unauthorized
        if (error.response && error.response.status === 401) {
          console.log("Unauthorized. Redirecting to login...");
          localStorage.clear();
          navigate("/login"); // Navigate to login page if unauthorized
        } else {
          console.error("An error occurred:", error); // Handle other errors
        }
      } finally {
        setLoading(false); // Set loading to false after the check
      }
    }

    checkUserLoggedIn();
  }, []);
  
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="dark:bg-[#121212] dark:text-white maincontainer transition-all">
        <Header />
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
        <Footer />
      </div>
    </>
  );
}

export default memo(App);
