import { createSlice } from '@reduxjs/toolkit';

export interface ISymbol{
    x: number,
    y: number,
    title: string,
    description: string,
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
        }
    },
});

export const { setSymbols } = symbolsSlice.actions;
export default symbolsSlice.reducer;