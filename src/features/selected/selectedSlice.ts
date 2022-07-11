import { createSlice } from '@reduxjs/toolkit';
import { ISymbol } from '../symbols/symbolsSlice';

interface ISelectedInit{
    index: number,
};

const initialState: ISelectedInit = {
    index: -1,
};

export const selectedSlice = createSlice({
    name: "selected",
    initialState,
    reducers: {
        setSelected: (state, action) => {
            state.index = action.payload;
        }
    },
});

export const { setSelected } = selectedSlice.actions;
export default selectedSlice.reducer;