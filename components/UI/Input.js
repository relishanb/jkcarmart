function Input(props) {
  return (
    <input
      type={props.type}
      value={props.value}
      className={props.className}
      min={props.min}
      max={props.max}
      data-min={props.dataMin}
      data-max={props.dataMax}
      step={props.step}
      onChange={props.onChange}
    />
  );
}
export default Input;
