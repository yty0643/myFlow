import { createSlice } from '@reduxjs/toolkit';

export interface ISymbol{
    x: number,
    y: number,
    width: number,
    height: number,
}

interface ISymbolsInit{
    symbols: ISymbol[]
};

const initialState: ISymbolsInit = {
    symbols: [],
};

export const symbolsSlice = createSlice({
    name: "symbols",
    initialState,
    reducers: {
        setSymbols: (state, action) => {
            state.symbols = action.payload;
        },
        setSymbol: (state, action) => {
            state.symbols[action.payload.index] = action.payload.symbol;
        }
    },
});

export const { setSymbols, setSymbol} = symbolsSlice.actions;
export default symbolsSlice.reducer;