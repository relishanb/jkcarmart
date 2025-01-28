import styles from "./PrimaryButton.module.css";
function PrimaryButton(props) {
    return (
      <button
        type={props.type}
        value={props.value}        
        onClick={props.onClick}
        className={`${props.className} ${styles.btn}`}
        disabled = {props.disabled}
      >
        {props.children}
      </button>
    );
  }
  export default PrimaryButton;
  