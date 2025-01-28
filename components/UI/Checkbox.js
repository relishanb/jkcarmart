import styles from "./Checkbox.module.scss";
function Checkbox(props) {
  return (
    <>
      <input
        id={props.id}
        name={props.name}
        className={styles.inp_cbx}
        type="checkbox"
        onClick={props.onClick}
        checked={props.checked}     
        onChange={()=>console.log("")}   
      />
      <label className={styles.cbx} htmlFor={props.id} onClick={e => e.stopPropagation()}>
        <span>
          <svg width="12px" height="10px" viewBox="0 0 12 10">
            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
          </svg>
        </span>
        <span>{props.label}</span>
      </label>
    </>
  );
}
export default Checkbox;
