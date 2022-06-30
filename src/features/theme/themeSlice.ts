import { createSlice } from '@reduxjs/toolkit';

interface ITheme{
    isActive: boolean
};

const initialState: ITheme = {
    isActive: false,
};

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggle: (state) => {
            state.isActive = !state.isActive;
        },
    },
});

export const { toggle } = themeSlice.actions;

export default themeSlice.reducer;