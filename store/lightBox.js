import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "", 
  url: "",
  isActive:false
};

const lightBoxSlice = createSlice({
  name: "lightBox",
  initialState,
  reducers: {
    
    showLightBox(state, action) {
      state.type = action.payload.type;
      state.url = action.payload.url;
      state.isActive = true;      
    },
    hideLightBox(state) {
      state.type = "";
      state.url = "";
      state.isActive = false;        
    },
    
  },
});

export default lightBoxSlice.reducer;
export const lightBoxActions = lightBoxSlice.actions;
