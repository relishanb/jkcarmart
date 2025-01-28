import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shortlistedCars: [], 
  comparedCars: [],
};

const userInterestedCarsSlice = createSlice({
  name: "userInterestedCars",
  initialState,
  reducers: {
    toggleShortlistedCars(state, action) {
      state.shortlistedCars = state.shortlistedCars.includes(action.payload)
        ? state.shortlistedCars.filter((el) => el != action.payload)
        : [...state.shortlistedCars, action.payload];
      localStorage.setItem(
        "shortlistedCars",
        JSON.stringify(state.shortlistedCars)
      );
    },
    fillShortlistedCars(state) {
      state.shortlistedCars = localStorage.getItem("shortlistedCars")
        ? JSON.parse(localStorage.getItem("shortlistedCars"))
        : [];
    },
    toggleComparedCars(state, action) {
      state.comparedCars = state.comparedCars.includes(action.payload)
        ? state.comparedCars.filter((el) => el != action.payload)
        : [...state.comparedCars, action.payload];
      localStorage.setItem(
        "comparedCars",
        JSON.stringify(state.comparedCars)
      );
    },
    fillComparedCars(state) {
      state.comparedCars = localStorage.getItem("comparedCars")
        ? JSON.parse(localStorage.getItem("comparedCars"))
        : [];
    },
  },
});

export default userInterestedCarsSlice.reducer;
export const userInterestedCarsActions = userInterestedCarsSlice.actions;
