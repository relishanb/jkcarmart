import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mobileNumber: "",  
  password:"",  
  isLoggedIn: false,
  activeScreen: "Login",
  isAuthenticationModelActive: false,
  userId:null
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    toggleAuthenticationModel(state, action) {
       state.isAuthenticationModelActive = action.payload;
       state.activeScreen !="Login" && (state.activeScreen = "Login");
    },
    changeScreen(state,action){
      state.activeScreen = action.payload;
    },
    verifyMobileNumber(state, action) {
      state.mobileNumber = action.payload;
      state.activeScreen = "OTPVerification";
    },
    verifyOTP(state, action) {      
      state.isLoggedIn = true;
      state.isAuthenticationModelActive = false;   
      state.userId = action.payload.userId;
      console.log(`user id in store = ${action.payload.userId}`);
      localStorage.setItem("userId", action.payload.userId); 
    },    
    updatePassword(state, action) {      
      state.password = action.payload;
      state.isLoggedIn = true;
      state.isAuthenticationModelActive = false;  
      localStorage.setItem("userId", "U12345");   
    },
    loggout(state){
      state.isLoggedIn = false;
      localStorage.removeItem("userId");
    },
    fillLoginDetails(state,action){      
      state.userId = action.payload.userId;
      state.isLoggedIn = true;
    },
  },
});

export default authenticationSlice.reducer;
export const authenticationActions = authenticationSlice.actions;
