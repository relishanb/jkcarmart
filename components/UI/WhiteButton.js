import styles from "./WhiteButton.module.css";
function WhiteButton(props) {
    return (
      <button
        type={props.type}
        value={props.value}        
        onClick={props.onClick}
        className={styles.btn}
      >
        {props.children}
      </button>
    );
  }
  export default WhiteButton;
  