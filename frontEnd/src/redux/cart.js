import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: JSON.parse(sessionStorage.getItem("carts")) || [],
    isLoadCart: false,
  },
  reducers: {
    setCarts: (state, action) => {
      state.carts = action.payload;
    },

    setIsLoadCart: (state) => {
      state.isLoadCart = !state.isLoadCart;
    },
  },
});

export const { setCarts, setIsLoadCart } = cartSlice.actions;
export default cartSlice.reducer;
