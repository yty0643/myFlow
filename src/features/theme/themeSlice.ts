import { createSlice } from '@reduxjs/toolkit';

interface IThemeinit{
    isActive: boolean
};

const initialState: IThemeinit = {
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