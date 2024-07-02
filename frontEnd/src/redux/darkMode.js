import { createSlice } from '@reduxjs/toolkit';

export const darkMode = createSlice({
    name: 'product',
    initialState: {
        dark: 'dark'
    },

    reducers: {
        lightDark: (state, action) => {
            state.dark = action.payload
        }
        
    },
});

export const { lightDark } = darkMode.actions;
export default darkMode.reducer;
