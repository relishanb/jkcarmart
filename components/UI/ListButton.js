import styles from "./ListButton.module.css";
function ListButton(props) {
  return (
    <button
      type={props.type}
      value={props.value}
      className={`${styles.list_btn} ${props.className} ${props.className.includes("active")?styles.active:""}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
export default ListButton;
