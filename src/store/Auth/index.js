import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: localStorage.getItem("email") ? localStorage.getItem("email") : "",
  role: localStorage.getItem("role") ? localStorage.getItem("role") : "",
  token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerAuth: (state, action) => {
      state.token = action.payload.access_token;
      state.email = action.payload.email;
      state.role = action.payload.role;
      localStorage.setItem("token", action.payload.access_token);
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("role", action.payload.role);
    },
    logOut: (state, action) => {
      state.email = "";
      state.role = "";
      state.token = "";

      localStorage.removeItem("token");
    },
    remakeToken: (state, action) => {},
  },
});

export const { registerAuth, logOut } = auth.actions;
export default auth.reducer;
