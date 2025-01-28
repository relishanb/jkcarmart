function Button(props) {
  return (
    <button
      type={props.type}
      value={props.value}
      data-brand={props.dataBrand}
      className={props.className}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
export default Button;
