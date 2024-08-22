import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  passwordmanger:[],
  userIsLogged : false,
  userdetailsEntity:[],
  darkmode:false,
};


 export  const password_managerSlice = createSlice({
    name:"password_manager",
    initialState,
    reducers:{
      setFeilds:(state, action)=>{
        state.passwordmanger  = action.payload
      },

      handleUserLogin :(state ,action) => { 
        state.userIsLogged = action.payload
       },

       handleUserDetailsEntity : (state, action) => { 

        state.userdetailsEntity = action.payload
        },

        handleDarkmode: (state, action) => { 
          state.darkmode = action.payload
         }
    }
})

export const {setFeilds , handleUserLogin , handleUserDetailsEntity , handleDarkmode} = password_managerSlice.actions

export default password_managerSlice.reducer