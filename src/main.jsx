import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './componants/redux/store.js'

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Login from './componants/Login & singup/Login.jsx'
import SignUp from './componants/Login & singup/SingUp.jsx'
import PasswordMan from './componants/password Manager/PasswordMan.jsx'
import GetStarted from './componants/Get Started page/GetStarted.jsx'
import EditUserProfile from './componants/User Profile/EditUserProfile.jsx'

const router = createBrowserRouter(createRoutesFromElements
  (
    <Route path=''  element={<App/>} >

    <Route path='/' element={<GetStarted/>} />
    <Route path='/singup' element={<SignUp/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/pass_manager' element={<PasswordMan/>} />
    <Route path='/edit_profile/:id' element={<EditUserProfile/>} />

    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
