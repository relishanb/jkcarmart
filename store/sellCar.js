import { createSlice, current } from "@reduxjs/toolkit";

export const sellCarStepNames = {
  Brand: "Brand",
  RegistrationYear: "RegistrationYear",
  Model: "Model",
  Variant: "Variant",
  Mileage: "Mileage",
  OwnerType: "OwnerType",
  Location: "Location",
  ExpectedPrice: "ExpectedPrice",
  Photos: "Photos",
  UserDetails: "UserDetails",
  UserVerified: "UserVerified",
};

export const sellCarHeadings = {
  [sellCarStepNames.Brand]: "Select Brand",
  [sellCarStepNames.RegistrationYear]: "Select Year",
  [sellCarStepNames.Model]: "Select Model",
  [sellCarStepNames.Variant]: "Select Variant",
  [sellCarStepNames.Mileage]: "Kilometer Driven",
  [sellCarStepNames.OwnerType]: "Past Owners",
  [sellCarStepNames.Location]: "Select Location",
  [sellCarStepNames.ExpectedPrice]: "Expected Price",
  [sellCarStepNames.Photos]: "Upload Car Photos",
  [sellCarStepNames.UserDetails]: "Login or Register",
};

const allStepsData = {
  [sellCarStepNames.Brand]: [],
  [sellCarStepNames.RegistrationYear]: [],
  [sellCarStepNames.Model]: [],
  [sellCarStepNames.Variant]: [],
  [sellCarStepNames.Mileage]: [],
  [sellCarStepNames.OwnerType]: [],
  [sellCarStepNames.Location]: [],
  [sellCarStepNames.ExpectedPrice]: [],
  [sellCarStepNames.Photos]: [],
  [sellCarStepNames.UserDetails]: {Name:"Seller",MobileNumber:""},
  [sellCarStepNames.UserVerified]: false,
};
  

const initialState = {
    sellCarData : allStepsData,
    activeStep : sellCarStepNames.Brand,
    stepsAchieved : []
}

const sellCarSlice = createSlice({
  name: "SellCar",
  initialState,
  reducers: {

    verifyUser(state){      
      state.sellCarData.UserVerified = true;
      //console.log(current(state.sellCarData));
    },

    resetSellCarData(state){
      state.sellCarData = allStepsData,
      state.activeStep = sellCarStepNames.Brand,
      state.stepsAchieved = []      
    },

    showSellCarStep(state,action){
      //console.log(action.payload);
      state.activeStep = action.payload;
    },


    updateSellCarStep(state,action){

      let keys = Object.keys(sellCarStepNames);        
      const nextIndex = keys.indexOf(action.payload.step) + 1;
      state.activeStep = Object.values(sellCarStepNames)[nextIndex];

    },

    updateSellCarData(state,action){

      //console.log(action.payload);


      let keys = Object.keys(sellCarStepNames);        
      const nextIndex = keys.indexOf(action.payload.step) + 1;

if(state.stepsAchieved.includes(action.payload.step)){

  console.log("if block");

  const stepsAchieved = state.stepsAchieved.filter((element,index)=>index < nextIndex);
  state.stepsAchieved = stepsAchieved;

  let sellCarData = state.sellCarData;
  for (const step in sellCarData) {    
    if(!stepsAchieved.includes(step)) sellCarData[step]="";    
    
  }

  sellCarData[action.payload.step] = [{id:action.payload.id , value:action.payload.value}];
  
  

  action.payload.step == sellCarStepNames.Photos ? state.sellCarData[action.payload.step] = action.payload.value : state.sellCarData = sellCarData;

  //localStorage.removeItem("uploadedImages");


//console.log(current(state.sellCarData));

}
else{

  console.log("else block");
  // console.log("action.payload.step",action.payload.step);
  // console.log("action.payload.value",action.payload.value);
  
  action.payload.step == sellCarStepNames.Photos
    ? (state.sellCarData[action.payload.step] = action.payload.value)
    : (state.sellCarData[action.payload.step] = [
        { id: action.payload.id, value: action.payload.value },
      ]);
  
       state.stepsAchieved.push(action.payload.step);

//console.log(current(state.sellCarData));

}



if(action.payload.step != sellCarStepNames.UserDetails && action.payload.step != sellCarStepNames.ExpectedPrice && action.payload.step != sellCarStepNames.Mileage && action.payload.step != sellCarStepNames.Photos) state.activeStep = Object.values(sellCarStepNames)[nextIndex];

      console.log("expected price", current(state.sellCarData));

    },

    removeImage(state,action){

      state.sellCarData[sellCarStepNames.Photos].splice(action.payload,1);


    },

  },
});

export default sellCarSlice.reducer;
export const sellCarActions = sellCarSlice.actions;
