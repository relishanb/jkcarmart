import styles from "./FilterButton.module.css";
function FilterButton(props) {
  return (
    <button
      type={props.type}
      value={props.value}
      className={`${styles.filter_btn} ${props.className} ${props.className.includes("active")?styles.active:""}`}
      style={props.style}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
export default FilterButton;
