import { memo, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PasswordMan from "./componants/password Manager/PasswordMan";
import SingUp from "./componants/Login&singup/SingUp";
import Login from "./componants/Login&singup/Login";
import Header from "./componants/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./componants/footer/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="dark:bg-[#121212] dark:text-white maincontainer transition-all">
        <Header />

        {<Outlet />}

        <Footer />
      </div>
    </>
  );
}

export default memo(App);
