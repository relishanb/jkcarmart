import styles from "./SellCarSteps.module.css";
import { sellCarStepNames } from "@/store/sellCar";
import { useDispatch, useSelector } from "react-redux";
import { sellCarActions } from "@/store/sellCar";
import { useEffect, useState } from "react";

function SellCarSteps(props) {

    const [SellCarSteps, setSellCarSteps] = useState([
        { text: "Brand", value: "Brand", title: "Select Brand" },
        { text: "Year", value: "RegistrationYear", title: "Select Year" },
        { text: "Model", value: "Model", title: "Select Model" },
        { text: "Variant", value: "Variant", title: "Select Variant" },
        { text: "Kilometer Driven", value: "Mileage", title: "Select Kilometer Driven" },
        { text: "Owners", value: "OwnerType", title: "Select Owners" },
        { text: "Location", value: "Location", title: "Select Location" },
        { text: "Expected Price", value: "ExpectedPrice", title: "Select Expected Price" },
        { text: "Photos", value: "Photos", title: "Photos" },

    ]);
    const isLoggedIn = useSelector(state => state.authentication.isLoggedIn);
    const dispatch = useDispatch();
    const stepsAchieved = useSelector(state => state.sellCar.stepsAchieved);
    useEffect(() => {
        if (window.innerWidth < 768) {
            const sell_tab = document.querySelectorAll(`[data-value=${props.sellCarInfo.activeStep}]`)[0];
            sell_tab.scrollIntoViewIfNeeded({ behavior: 'smooth' });
        }
    }, [props]);
    useEffect(() => {
        if (!isLoggedIn) {
            setSellCarSteps(prevSteps => {
                const updatedSteps = [...prevSteps];
                if (!updatedSteps.some(step => step.value == "UserDetails")) {
                    updatedSteps.push({ text: "Login/Register", value: "UserDetails", title: "Personal Information" })
                }
                return updatedSteps;
            });
        } else {
            setSellCarSteps(prevSteps => {
                const updatedSteps = prevSteps.filter(step => step.value != "UserDetails");
                return updatedSteps;
            });
        }
    }, [isLoggedIn]);
    function showStep(value) {
        stepsAchieved.includes(value) && dispatch(sellCarActions.showSellCarStep(value));
    };

    let classNames;
    let stepText;

    return (
        <ul id="sell_tabs" className={styles.tabs}>
            {SellCarSteps.map((element, index) => {

                classNames = `${styles.tablinks} ${props.sellCarInfo.activeStep == sellCarStepNames[element.value] ? styles.active : ""} ${props.sellCarInfo.stepsAchieved.includes(sellCarStepNames[element.value]) ? styles.achieved : ""}`;
                stepText = (element.text != "Photos" && element.text != "Login/Register" && props.sellCarInfo.stepsAchieved.includes(sellCarStepNames[element.value])) ? props.sellCarInfo.sellCarData[element.value][0]?.value || element.text : element.text;

                return (
                    <li title={element.title} key={index} className={classNames} type="button" data-value={[element.value]} onClick={(e) => showStep(e.target.getAttribute("data-value"))}>
                       <div className="p-2  text-md">{stepText}</div>
                    </li>
                );
            })}
        </ul>
    );
}
export default SellCarSteps;