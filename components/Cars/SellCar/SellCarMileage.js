import { useSelector, useDispatch } from "react-redux";
import { sellCarActions, sellCarStepNames } from "@/store/sellCar";
import { useEffect, useState } from "react";
import styles from "./SellCarContent.module.css";

function SellCarMileage() {
  const [validMileage, setValidMileage] = useState(true);
  const sellCarInfo = useSelector((state) => state.sellCar);
  const mileage = sellCarInfo.sellCarData[sellCarStepNames.Mileage]?.[0]?.value || "";

  const formatMileage = (value) => {
    if (!value) return "";
    return new Intl.NumberFormat("en-IN").format(Number(value.replace(/[^0-9]/g, "")));
  };

  const formattedMileage = formatMileage(mileage);

  useEffect(() => {
    if (formattedMileage && formattedMileage !== "") setValidMileage(true);
  }, [formattedMileage]);

  const dispatch = useDispatch();

  const updateMileage = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    if (!numericValue || isNaN(numericValue) || Number(numericValue) < 1) return;

    const formattedValue = new Intl.NumberFormat("en-IN").format(Number(numericValue));
    dispatch(sellCarActions.updateSellCarData({ step: sellCarInfo.activeStep, id: 1, value: formattedValue }));
  };

  const updateStep = () => {
    if (formattedMileage.replace(/,/g, "") > 0) {
      setValidMileage(true);
      dispatch(sellCarActions.updateSellCarStep({ step: sellCarInfo.activeStep }));
    } else {
      setValidMileage(false);
    }
  };

  return (
    <div className={styles.mileageContainer}>
      {!validMileage && <div className="form_error">Please Enter Kilometer Driven</div>}
      <div className={`${styles.inputGroup} ${styles.inputGroupInline} ${styles.width_300_px}`}>
        <input
          id="mileage"
          type="text"
          className="p-3 box-border border-2 focus:border-orange-500 rounded-l-md h-11"
          placeholder="Enter Kilometer Driven"
          value={formattedMileage}
          onChange={(e) => updateMileage(e.target.value)}
        />
        <button
          className="bg-orange-500 p-3 rounded-r-md text-white gtmEvent_sellCarStep_kilometerDriven"
          onClick={updateStep}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default SellCarMileage;
