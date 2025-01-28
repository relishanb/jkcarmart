import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "../store/filters";
import sellCarSlice from "../store/sellCar";
import updateCarSlice from "../store/updateCar";
import authenticationSlice from "../store/authentication";
import userInterestedCarsSlice from "../store/userInterestedCars";
import lightBoxSlice from "../store/lightBox";
import userPanelSlice from "../store/userPanel";

import { jsonServerApi } from "./apiServices/apiServices";
import { jsonServerApiBlogs } from "./apiServices/apiServicesBlogs";

const store = configureStore({
  reducer: {
    filter: filterSlice,
    sellCar: sellCarSlice, 
    updateCar: updateCarSlice, 
    authentication:authenticationSlice,   
    userInterestedCars:userInterestedCarsSlice,
    lightBox:lightBoxSlice,
    userPanel:userPanelSlice,
    [jsonServerApi.reducerPath]: jsonServerApi.reducer,
    [jsonServerApiBlogs.reducerPath]: jsonServerApiBlogs.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jsonServerApi.middleware,jsonServerApiBlogs.middleware),
});

export default store;
