import { createSlice } from '@reduxjs/toolkit';
import { endTrackValue } from '@testing-library/user-event/dist/types/document';
import { ISymbol } from '../symbols/symbolsSlice';

interface ISelectedInit{
    start: number[],
    end: number[],
    // flows: {
    //     start: number[],
    //     end: number[]
    // }[],
    flows: number[][][];
};

const initialState: ISelectedInit = {
    start: [],
    end: [],
    flows: []
};

export const flowsSlice = createSlice({
    name: "flows",
    initialState,
    reducers: {
        pushFlows: (state) => {
            state.flows.push([[],[],[],[]]);
        },
        setFlows: (state, action) => {
            state.flows[action.payload.start[0]][action.payload.start[1]] = action.payload.end;
        },
        setStart: (state, action) => {
            state.start = action.payload;
        },
        setEnd: (state, action) => {
            state.end = action.payload;
        }
    },
});

export const { pushFlows, setFlows, setStart, setEnd } = flowsSlice.actions;
export default flowsSlice.reducer;