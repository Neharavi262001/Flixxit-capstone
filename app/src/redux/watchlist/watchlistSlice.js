import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  watchlist: [],
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    setWatchlist: (state, action) => {
      state.watchlist = action.payload;
    },
    addToWatchlist: (state, action) => {
      state.watchlist = [...state.watchlist, action.payload];
    },
    removeFromWatchlist: (state, action) => {
      state.watchlist = state.watchlist.filter(item => item.id !== action.payload.id);
    },
    clearWatchlist: (state) => {
      state.watchlist = [];
    },
  },
});

export const { setWatchlist, addToWatchlist, removeFromWatchlist, clearWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;