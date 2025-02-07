import React from 'react';
import Select from 'react-select';

const customStyles = {
  control: (base, state) => ({
    ...base,
    background: "none",
    borderRadius: "8px",
    border: state.isFocused ? "0px solid orange" : "1px solid #e2e2e2",
    boxShadow: state.isFocused ? "0 0 0 1px orange" : "none",
    "&:hover": {
      borderColor: "orange",
    },
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#FB8C00"
      : state.isFocused
      ? "FB8C00"
      : "white",
    color: state.isSelected ? "white" : "black",
    "&:hover": {
      backgroundColor: "#FFE0B2",
    },
  }),
  placeholder: (base) => ({
    ...base,
    color: 'black',
  }),
};

const CustomSelect = (props) => {
  return <Select {...props} styles={customStyles} />;
};

export default CustomSelect;