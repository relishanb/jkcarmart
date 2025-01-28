import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
  activeScreen:{id:"PostedAds",text:"Posted Ads"}
};

const userPanelSlice = createSlice({
  name: "lightBox",
  initialState,
  reducers: {
    
    setActiveScreen(state, action) {      
      state.activeScreen = action.payload;    
    },    
  },
});

export default userPanelSlice.reducer;
export const userPanelActions = userPanelSlice.actions;
