import OptionsList from "./SharedComponents/OptionsList";

function SellCarOwners() {

  const options = [
    {id:1,value:"1st Owner"},
    {id:2,value:"2nd Owner"},
    {id:3,value:"3rd Owner"},   
    {id:4,value:"4th Owner"},
  ]
  
    return <OptionsList className="gtmEvent_sellCarStep_owners" options={options.map(({id,value})=>({optionId:id,optionName:value}))} />;
    
  }

export default SellCarOwners;
