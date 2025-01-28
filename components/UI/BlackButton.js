import styles from "./BlackButton.module.css";
function BlackButton(props) {
    return (
      <button
        type={props.type}
        value={props.value}        
        onClick={props.onClick}
        className={`${styles.btn} ${props.className}`}
      >
        {props.children}
      </button>
    );
  }
  export default BlackButton;
  