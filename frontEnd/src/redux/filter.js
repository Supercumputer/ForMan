import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    color: [],
    size: [],
    price: { minPrice: 0, maxPrice: 10000000 },
  },
  reducers: {
    filter: (state, action) => {
      state.size = action.payload.sizes;
      state.color = action.payload.colors;
      state.price = action.payload.price;
    },
  },
});

export const { filter } = filterSlice.actions;
export default filterSlice.reducer;
