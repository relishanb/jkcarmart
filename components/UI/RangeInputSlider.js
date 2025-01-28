import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import Input from "@/components/UI/Input";
import styles from "./RangeInputSlider.module.scss";

function RangeInputSlider(props) {
  const rangeProps = {
    type: "number",
    min: `${props.data.initialRangeValues[0]}`,
    max: `${props.data.initialRangeValues[1]}`,
    dataMin: `${props.data.rangeValue[0]}`,
    dataMax: `${props.data.rangeValue[1]}`,
    className: `${styles.input_number}`,
  };

  return (
    <>
      <div className={styles.range_input}>
        <div className={styles.field}>
        {props.data.type=="Price range"?"₹":""}
          <Input
            {...rangeProps}
            value={props.data.rangeValue[0]}
            onChange={(e) =>
              props.onChange([
                Number(e.target.value),
                Number(e.target.getAttribute("data-max")),
              ])
            }
          />
        </div>
       
        <div className={`${styles.field} ${styles.field_right} ${props.data.type=="Price range"?styles.field_price:""}`}>
        {props.data.type=="Price range"?"₹":""}
          <Input
            {...rangeProps}
            value={props.data.rangeValue[1]}
            onChange={(e) =>
              props.onChange([
                Number(e.target.getAttribute("data-min")),
                Number(e.target.value),
              ])
            }
          />
        </div>
      </div>

      <RangeSlider
        className={`gtmEvent_filter_selected gtmEvent_filter${props.data.type.replaceAll(' ', '')}_selected`}
        min={props.data.initialRangeValues[0]}
        max={props.data.initialRangeValues[1]}
        step={props.data.step}
        value={[props.data.rangeValue[0], props.data.rangeValue[1]]}
        onInput={(value) => props.onChange(value)}
      />

<div className={styles.input_lables}>
  <div className={styles.input_lable}>
  min
  </div>
  <div className={styles.input_lable}>
  max
  </div>
</div>

    </>
  );
}

export default RangeInputSlider;
