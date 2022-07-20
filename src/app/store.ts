import { flowsSlice } from '../features/flows/flowsSlice';
import { selectedSlice } from './../features/selected/selectedSlice';
import { symbolsSlice } from './../features/symbols/symbolsSlice';
import { themeSlice } from './../features/theme/themeSlice';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    symbols: symbolsSlice.reducer,
    selected: selectedSlice.reducer,
    flows: flowsSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
