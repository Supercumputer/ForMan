import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    isLoading: true,
    messager: "",
    account: {},
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.account = action.payload;
    },

    logout: (state, action) => {
      state.isAuthenticated = false;
      state.account = {};
    },

    setLoading: (state, action) => {
      state.isLoading = false;
    }
  },
});

export const { login, setLoading, logout } = authSlice.actions;
export default authSlice.reducer;
