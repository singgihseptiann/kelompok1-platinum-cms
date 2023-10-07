import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  email: "",
  name: "",
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerAuth: (state, action) => {
      state.token = action.payload.secret;
      state.name = action.payload.name;
    },
    logOut: (state, action) => {},
    remakeToken: (state, action) => {},
  },
});

export const { registerAuth, logOut, remakeToken } = auth.actions;
export default auth.reducer;

// import { useDispatch } from "react-redux";
// import { registerAuth } from "../store/Auth";

// const LoginComponent = () => {
// const dispatch = useDispatch();

// dispatch(
// registerAuth({ secret: loginResponse.data.access_token, name: 'admin'})
// );
// }
