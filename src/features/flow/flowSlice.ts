import { createSlice } from '@reduxjs/toolkit';
import { endTrackValue } from '@testing-library/user-event/dist/types/document';
import { ISymbol } from '../symbols/symbolsSlice';

interface ISelectedInit{
    start: number[],
    end: number[],
};

const initialState: ISelectedInit = {
    start: [],
    end: [],
};

export const flowSlice = createSlice({
    name: "flow",
    initialState,
    reducers: {
        setStart: (state, action) => {
            state.start = action.payload;
        },
        setEnd: (state, action) => {
            state.end = action.payload;
        },
    },
});

export const { setStart, setEnd } = flowSlice.actions;
export default flowSlice.reducer;