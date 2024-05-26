import { createSlice } from '@reduxjs/toolkit';

export const darkMode = createSlice({
    name: 'product',
    initialState: {
        dark: false
    },

    reducers: {
        lightDark: (state, action) => {
            state.searchValue = !state.dark
        }
        
    },
});

export const { lightDark } = darkMode.actions;
export default darkMode.reducer;
