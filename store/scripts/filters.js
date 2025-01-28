import { filterNames,queryFilterNames } from "../filters";
import useGetModels from "@/hooks/use-getModels";


function createFilterParameters(state){

  // const data = useGetModels();
  // console.log("data");
  // console.log(data);


    let appliedFilterProperties = [];
    let i=0;
    
// console.log("state.filterData");
// console.log(state.filterData);

    state.filterData.forEach((el, index) => {
  
      const filter = Object.keys(el)[0];   
  
      if (el[filter].length > 0) {     
  
        switch (filter) {
          
          case filterNames.Brand:    

          const carAllModels =  (localStorage.getItem("AllModels") && localStorage.getItem("AllModels") != "undefined") ? JSON.parse(localStorage.getItem("AllModels")) : [];
                           
            let brandModelString = "";
            el[filter].map(function (el, index) {                               
    
              const filteredCarModels = carAllModels.filter(({brandId}) => brandId == el.brand);
              
              const totalModels = filteredCarModels.length;  
              
              //console.log(`total models ${totalModels}`);


              let models = "";
              if(totalModels > el.models?.length && el.models?.length > 0)
              {              
                el.models.map(function (el, index) {
                  models += `${index != 0 ? " or " : ""}model_Idfk = ${el}`;
                });
              }
              brandModelString += `${index != 0 ? " or " : ""}${queryFilterNames.Brand} = ${
                el.brand
              } ${(totalModels > el.models?.length && el.models?.length > 0) ?  `and (${models})`:""}`;            
            });          
            appliedFilterProperties.push({PropertyName:`${i!=0?"and ":""}(${brandModelString})`});
            i++;
            break;
  
            case filterNames.Mileage :
            case filterNames.Price :
            case filterNames.RegistrationYear : 
              const rangeValues = `${queryFilterNames[filter]} >= ${el[Object.keys(el)[0]][0]} and ${queryFilterNames[filter]} <= ${el[Object.keys(el)[0]][1]}`;
              appliedFilterProperties.push({PropertyName:`${i!=0?"and ":""}(${rangeValues})`});
              i++;
              break;
  
            case filterNames.FuelType :
            case filterNames.OwnerType :
            case filterNames.BodyType :
            case filterNames.Transmission :                       
            case filterNames.Location :
              let  optionsString="";
              el[filter].map(function(el,index){
                optionsString+= `${index != 0?" or ":""}${queryFilterNames[filter]} = '${el}'`;
              });
              appliedFilterProperties.push({PropertyName:`${i!=0?"and ":""}(${optionsString})`});
              i++;
              break;

            case filterNames.Seats :
            case filterNames.Color :            
              let  optionsStringIds="";
              el[filter].map(function(el,index){
                optionsStringIds+= `${index != 0?" or ":""}${queryFilterNames[filter]} = ${el}`;
              });
              appliedFilterProperties.push({PropertyName:`${i!=0?"and ":""}(${optionsStringIds})`});
              i++;
              break;

              case filterNames.User :               
              appliedFilterProperties.push({PropertyName:`${i!=0?"and (":""}${queryFilterNames.User}=${el[Object.keys(el)[0]][0]}${i!=0?")":""}`});               
              i++;
              break;
  
        }
  
      }
    });
  
    //const filterParameters = {filterList:appliedFilterProperties};


    //console.log(appliedFilterProperties);


let allFilterProperties="";
appliedFilterProperties.map(({PropertyName},index)=>{
  allFilterProperties+=`${index!=0?" ":""}${PropertyName}`;
});
//allFilterProperties = {PropertyName:allFilterProperties};
  
const filterParameters = {filterList:allFilterProperties};


//console.log(filterParameters);


    return filterParameters;
  
  }

  export default createFilterParameters;