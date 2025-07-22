import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../store";

interface InitialAuthStateProps {
  username: string | null
  token: string
}

const initialAuthState:InitialAuthStateProps = {
  username: localStorage.getItem("username") ?? null,
  token: localStorage.getItem("token") || "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem(
        "username",
        action.payload.data.user_name
      );
      state.token = action.payload.token;
      state.username = action.payload.data.user_name;

      return state;
    },

    logout: (state) => {
      const win = window;
      win.location.replace("/login");
      localStorage.clear();
      state.token = '';
      state.username = null;
      return state;
    },
  },
});

export default authSlice.reducer;

export const { login, logout } = authSlice.actions;

/* SELECTORS */
const authSelector = (state:RootState) => {
  return state.auth;
};
export const selectUsername = createSelector(authSelector, (auth) => {
  return auth.username;
});
export const selectToken = createSelector(authSelector, (auth) => {
  return auth.token;
});
