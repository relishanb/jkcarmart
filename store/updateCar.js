import { createSlice, current } from "@reduxjs/toolkit";

export const updateCarFields = {
  Brand: "Brand",
  RegistrationYear: "RegistrationYear",
  Model: "Model",
  Variant: "Variant",
  Mileage: "Mileage",
  OwnerType: "OwnerType",
  Location: "Location",
  ExpectedPrice: "ExpectedPrice", 
  FuelType: "FuelType",
  Transmission: "Transmission",
  BodyType: "BodyType",
  Seats: "Seats",
  Color: "Color",
  CarDescription: "CarDescription",
  Images: "Images",
};

const updateCarFieldsData = {
  [updateCarFields.Brand]: [],
  [updateCarFields.RegistrationYear]: "",
  [updateCarFields.Model]: [],
  [updateCarFields.Variant]: [],
  [updateCarFields.Mileage]: [],
  [updateCarFields.OwnerType]: [],
  [updateCarFields.Location]: [],
  [updateCarFields.ExpectedPrice]: [],  
  [updateCarFields.FuelType]: [],
  [updateCarFields.Transmission]: [],
  [updateCarFields.BodyType]: [],
  [updateCarFields.Seats]: [],
  [updateCarFields.Color]: [],
  [updateCarFields.CarDescription]: [],
  [updateCarFields.Images]: [],
};
  

const initialState = {
    updateCarData : updateCarFieldsData,    
}

const updateCarSlice = createSlice({
  name: "SellCar",
  initialState,
  reducers: {

    fillUpdateCarData(state,action){
      console.log("action.payload");
      console.log(action.payload);
      if(action.payload){

        const cardDetails = {
          [updateCarFields.Brand]: [{id:action.payload.brandidfk,value:action.payload.brandName}],
          [updateCarFields.RegistrationYear]: [{id:0,value:action.payload.modelYear}],
          [updateCarFields.Model]: [{id:action.payload.modelidfk,value:action.payload.modelName}],
          [updateCarFields.Variant]: [{id:action.payload.variantidfk,value:action.payload.variantName}],
          [updateCarFields.Mileage]: [{id:0,value:action.payload.totalDriven}],
          [updateCarFields.OwnerType]: [{id:0,value:action.payload.ownerType}],
          [updateCarFields.Location]: [{id:action.payload.districtidfk,value:action.payload.districtName}],
          [updateCarFields.ExpectedPrice]: [{id:0,value:action.payload.expectedPrice}],
          [updateCarFields.FuelType]: [{id:0,value:action.payload.fuelType}],
          [updateCarFields.Transmission]: [{id:0,value:action.payload.transmission}],
          [updateCarFields.BodyType]: [{id:0,value:action.payload.bodyType}],
          [updateCarFields.Seats]: [{id:0,value:action.payload.seater}],
          [updateCarFields.Color]: [{id:action.payload.coloridfk,value:action.payload.color}],
          [updateCarFields.CarDescription]:  [{id:0,value:action.payload.comments}],
        };
  
        state.updateCarData = cardDetails;
        // console.log(cardDetails);
        
      }
      
    },

    updateEditCarData(state,action){
      state.updateCarData[action.payload.field] = [{id:action.payload.id , value:action.payload.value}];
      console.log(current(state.updateCarData));
    }

  },
});

export default updateCarSlice.reducer;
export const updateCarActions = updateCarSlice.actions;
