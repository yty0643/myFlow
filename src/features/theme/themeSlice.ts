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
        onToggle: (state) => {
            state.isActive = !state.isActive;
        },
    },
});

export const { onToggle } = themeSlice.actions;
export default themeSlice.reducer;