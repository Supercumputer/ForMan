import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userOnline: [],
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

    setUserOnline: (state, action) => {
      state.userOnline = action.payload;
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

export const { login, setLoading, logout, setUserOnline } = authSlice.actions;
export default authSlice.reducer;
