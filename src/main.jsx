import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./componants/redux/store.js";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import PasswordMan from "./componants/password_Manager/PasswordMan.jsx";
import Login from "./componants/Login_singup/Login.jsx";
import SingUp from "./componants/Login_singup/SingUp.jsx";
import GetStarted from "./componants/Get Started page/GetStarted.jsx";
import EditUserProfile from "./componants/User_Profile/EditUserProfile.jsx";
import LoadingSpinner from "./componants/loading_Spiner/LoadingSpinner.jsx";

// Lazy loading components
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<App />}>
      <Route path="/" element={<GetStarted />} />
      <Route path="/singup" element={<SingUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/pass_manager" element={<PasswordMan />} />
      <Route path="/edit_profile/:id" element={<EditUserProfile />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Suspense fallback={<LoadingSpinner />}>
      <RouterProvider router={router} />
    </Suspense>
  </Provider>
);
