import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  email: "",
  role: "",
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerAuth: (state, action) => {
      state.token = action.payload.access_token;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
    logOut: (state, action) => {},
    remakeToken: (state, action) => {},
  },
});

export const { registerAuth, logOut } = auth.actions;
export default auth.reducer;

// import { useDispatch } from "react-redux";
// import { registerAuth } from "../store/Auth";

// const LoginComponent = () => {
// const dispatch = useDispatch();

// dispatch(
// registerAuth({ secret: loginResponse.data.access_token, name: 'admin'})
// );
// }
