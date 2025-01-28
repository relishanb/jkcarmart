import { createSlice, current } from "@reduxjs/toolkit";
import createFilterParameters from "./scripts/filters";

let windowWidth;

if (typeof window !== "undefined") {
  windowWidth = window.innerWidth;
  //console.log("windowWidth" + " " + windowWidth);
}

const AllFilters = [
  { Brand: [] },
  { Mileage: [] },
  { Price: [] },
  { RegistrationYear: [] },
  { FuelType: [] },
  { OwnerType: [] },
  { BodyType: [] },
  { Transmission: [] },
  { Seats: [] },
  { Color: [] },
  { Location: [] },
  { User: [] },
]


const initialState = {
  activeFilter:"",
  activeMoreFilter:"Price",
  filterData: AllFilters,  
  storedFilterData:AllFilters,
  filterParameters:[],
  searchCarData:"",
  carsList:"",
  selectedFiltersCount: 0,
};

const filterIndexes = {
  Brand: 0,
  Mileage:1,
  Price:2,
  RegistrationYear:3,
  FuelType:4,
  OwnerType:5,
  BodyType:6,
  Transmission:7,
  Seats:8,
  Color:9,
  Location:10,
  User:11,
};


const filterSlice = createSlice({

  name: "filter",
  initialState,  
  reducers: {   

setActiveFilter(state,action){

   if(state.activeFilter != "" && state.activeFilter!=action.payload){
    const savedFilterData = JSON.parse(localStorage.getItem("filterData") || "[]");

    if (savedFilterData.length > 0) {
      if(savedFilterData[filterIndexes[state.activeFilter]][state.activeFilter].length < 1){
        state.filterData[filterIndexes[state.activeFilter]][state.activeFilter] = [];
      }   
    }   

  }

  state.activeFilter=state.activeFilter==action.payload?"":action.payload;
},

setActiveMoreFilter(state,action){
  state.activeMoreFilter=action.payload;
},

closeActiveFilter(state){
  state.activeFilter="";
},

updateFilterData(state,action){

const filtername = action.payload.filterName;
const filterPosition = filtername=="Model" ? filterIndexes.Brand : filterIndexes[filtername];

let brnadIncluded;

if(filtername=="Brand" || filtername=="Model")
{
  brnadIncluded = [...state.filterData[filterPosition].Brand].find(
    ({ brand }) => brand === action.payload.brand
  );
}

switch (filtername) {

  case "Brand":
    if (brnadIncluded) {
      state.filterData[filterPosition].Brand = [
        ...state.filterData[filterPosition].Brand.filter(
          (el) => el.brand != action.payload.brand
        ),
      ];
    } else {
      state.filterData[filterPosition].Brand = [
        ...state.filterData[filterPosition].Brand,
        { brand: action.payload.brand,brandName: action.payload.brandName, models: action.payload.models },
      ];
    }

    break;

  case "Model":
    if (brnadIncluded) {
      [...state.filterData[filterPosition].Brand].find(function (
        { brand },
        index
      ) {
        if (brand === action.payload.brand) {
          const modelIncluded = [
            ...state.filterData[filterPosition].Brand[index].models,
          ].includes(action.payload.model);

          if (modelIncluded) {
            state.filterData[filterPosition].Brand[index].models = [
              ...state.filterData[filterPosition].Brand[index].models.filter(
                (el) => el != action.payload.model
              ),
            ];
          } else {
            state.filterData[filterPosition].Brand[index].models = [
              ...state.filterData[filterPosition].Brand[index].models,
              action.payload.model,
            ];
          }
        }
      });
    } else {
      state.filterData[filterPosition].Brand = [
        ...state.filterData[filterPosition].Brand,
        {
          brand: action.payload.brand,
          brandName: action.payload.brandName,
          models: [action.payload.model],
        },
      ];      
    }
    //console.log(current(state.filterData));
    break;

  case "Mileage":
  case "Price":
  case "RegistrationYear":
    state.filterData[filterPosition][action.payload.filterName] = [action.payload.values[0],action.payload.values[1]];    
    break;

  case "FuelType":
  case "OwnerType":
  case "BodyType":
  case "Transmission":
  case "Seats":
  case "Color":
    const optionTypeIncluded = [...state.filterData[filterPosition][action.payload.filterName]].includes(action.payload.value);
     
    if (optionTypeIncluded) {
      state.filterData[filterPosition][action.payload.filterName] = [
        ...state.filterData[filterPosition][action.payload.filterName].filter(
          (el) => el != action.payload.value
        ),
      ];
    } else {
      state.filterData[filterPosition][action.payload.filterName] = [
        ...state.filterData[filterPosition][action.payload.filterName],
        action.payload.value,
      ];
    }    
    break;

    case "User":   
        state.filterData[filterPosition][action.payload.filterName] = [action.payload.values[0],action.payload.values[1]];    
        break;

}

//console.log(current(state.filterData));

},


fillFilterData(state){

  // localStorage.removeItem("filterData");
  // localStorage.removeItem("SearchCarData");

  state.filterData = initialState.filterData;

  const savedFilterData = JSON.parse(localStorage.getItem("filterData") || "[]");
  const savedSearchCarData = localStorage.getItem("SearchCarData"||"");

 if (savedFilterData.length > 0) {
  state.filterData = savedFilterData;
  state.storedFilterData = savedFilterData;  
  state.filterParameters = createFilterParameters(state);
  state.searchCarData = savedSearchCarData;
 } 
 state.selectedFiltersCount = 0;
},


applyFilter(state,action) {   

  //console.log(current(state));
  state.selectedFiltersCount = calculateSelectedFiltersCount(state.filterData);
  localStorage.setItem("filterData", JSON.stringify(state.filterData)); 
  
  state.storedFilterData = state.filterData;

  state.filterParameters = createFilterParameters(state);

  state.activeFilter="";

  //console.log(state.filterParameters);

},

clearAllFilters(state){
  //console.log(current(state))
  localStorage.removeItem("filterData");
  localStorage.removeItem("SearchCarData");

  state.activeFilter = initialState.activeFilter;
  state.activeMoreFilter = initialState.activeMoreFilter;
  state.filterData = initialState.filterData;
  state.storedFilterData = initialState.storedFilterData;
  state.filterParameters = initialState.filterParameters;
  state.searchCarData = initialState.searchCarData;

  //console.log(state)
},

clearFilter(state,action){


  let savedFilterData = JSON.parse(localStorage.getItem("filterData" || []));
  let filterData=state.filterData;
  let storedFilterData=state.storedFilterData;

  let MultiFiltersList = ["BodyType","Transmission","Seats","Color"];

  if(window.innerWidth < 992) MultiFiltersList = ["Brand","Mileage","Price","RegistrationYear","FuelType","OwnerType", ...MultiFiltersList];


const filters = action.payload == "MultiFilters"?MultiFiltersList:[action.payload];

console.log("action.payload");
console.log(action.payload);


filters.forEach(el=>{

  const filter = el;

  savedFilterData.find((el,index) => {if( Object.keys(el)[0] == filter) savedFilterData[index][filter] = []});

  filterData.find((el,index) => {if( Object.keys(el)[0] == filter) filterData[index][filter] = []});

  storedFilterData.find((el,index) => {if( Object.keys(el)[0] == filter) storedFilterData[index][filter] = []});

});

localStorage.setItem("filterData", JSON.stringify(savedFilterData));
state.filterData = filterData;
state.storedFilterData = storedFilterData;

state.filterParameters = createFilterParameters(state);

state.activeFilter="";
state.activeMoreFilter="BodyType";

if(action.payload=="Brand"){
  state.searchCarData = "";
  localStorage.removeItem("SearchCarData");
}


},

updateSearchData(state,action){    

  // if(state.searchCarData == action.payload.searchData.value)  return;
  
  // state.searchCarData = action.payload.searchData.value;
  // localStorage.setItem("SearchCarData",action.payload.searchData.value);
  
  const filterPosition = filterIndexes[filterNames.Brand];
  state.filterData[filterPosition].Brand = [];
  state.filterData[filterPosition].Brand = [
    ...state.filterData[filterPosition].Brand,
    {
      brand: action.payload.searchData.id[0],
      brandName: action.payload.searchData.id[1],
      models: [action.payload.searchData.id[2]],
    },
  ]; 
    

// console.log(current(state));


  
  },


  // clearSearchData(state){
  //   state.searchCarData = "";
  // },

  updateSearchLocation(state,action){
    const filterPosition = filterIndexes[filterNames.Location];
    //console.log(`filter position ${filterPosition}`);
    state.filterData[filterPosition].Location = [action.payload];
    //console.log(current(state.filterData));
  },

  setSelectedFiltersCount(state, action) {
    state.selectedFiltersCount = action.payload;
  },

  resetSelectedFiltersCount(state) {
    state.selectedFiltersCount = 0;
  },

  resetFilterState(state) {
    Object.assign(state, initialState); 
  },

  fillStoredFilterData(state, action) {
    state.filterData = action.payload;
    state.storedFilterData = action.payload;
    state.filterParameters = createFilterParameters(state);
    state.selectedFiltersCount = calculateSelectedFiltersCount(state.filterData);
    state.searchCarData = localStorage.getItem('SearchCarData') || '';
  },

  },  


});

function calculateSelectedFiltersCount(filterData) {
  return filterData.reduce((count, filter) => {
    const filterValues = Object.values(filter)[0];
    return count + (filterValues.length > 0 ? 1 : 0);
  }, 0);
}


export default filterSlice.reducer;
export const filterActions = filterSlice.actions;
export const filterPositions = filterIndexes;
export const filterNames = {
  Brand: "Brand",
  Mileage:"Mileage",
  Price:"Price",
  RegistrationYear:"RegistrationYear",
  FuelType:"FuelType",
  OwnerType:"OwnerType",
  BodyType:"BodyType",
  Transmission:"Transmission",
  Seats:"Seats",
  Color:"Color",
  Location:"Location",
  User:"User",
};
export const queryFilterNames = {
  Brand: "brand_Idfk",
  Mileage:"totalDriven",
  Price:"expectedPrice",
  RegistrationYear:"modelYear",
  FuelType:"fuelType",
  OwnerType:"ownerType",
  BodyType:"bodyType",
  Transmission:"transmission",
  Seats:"seater",
  Color:"color_idfk",
  Location:"districtName",
  User:"ci.user_Id",
};


