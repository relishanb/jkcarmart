import DatalistInput from 'react-datalist-input';
import 'react-datalist-input/dist/styles.css';

function DataList(props){
return(
<DatalistInput
          placeholder={props.placeholder}
          onSelect={(item) => props.onSearch?props.onSearch(item):console.log(item)}
          items={props.items}    
          value={props.value?props.value:""}    
          listboxOptionProps={{className:props.itemClass}}
          className='py-1'
        />
)
}
export default DataList;