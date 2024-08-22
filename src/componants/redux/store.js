import { configureStore } from "@reduxjs/toolkit";
import passwordSlice from "./reducer/passwordReducer";

export const store = configureStore({
  reducer: {
    password_manager: passwordSlice,
  },
});
