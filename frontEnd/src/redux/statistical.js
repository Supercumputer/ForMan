import { createSlice } from "@reduxjs/toolkit";

export const statisticalSlice = createSlice({
    name: "statistical",
    initialState: {
        isChange: false,
    },
    reducers: {
        setIsChange: (state) => {
           state.isChange = !state.isChange
        },
    },
});

export const { setIsChange } = statisticalSlice.actions;
export default statisticalSlice.reducer;
