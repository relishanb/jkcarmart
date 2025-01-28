import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sellCarStepNames, sellCarActions } from "@/store/sellCar";
import { FaRupeeSign } from "react-icons/fa";

function SellCarExpectedPrice() {
  const [validPrice, setValidPrice] = useState(true);
  const [priceInWords, setPriceInWords] = useState(""); 
  const dispatch = useDispatch();
  const sellCarInfo = useSelector((state) => state.sellCar);

  const formatCurrency = (value) => {
    if (!value) return "";
    return new Intl.NumberFormat("en-IN").format(Number(value.replace(/[^0-9]/g, "")));
  };

  const numberToWords = (num) => {
    const a = [
      "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
      "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen",
    ];
    const b = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
    const c = ["", "thousand", "lakh", "crore"];
    
    const numToWords = (n) => {
      if (n < 20) return a[n];
      if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + a[n % 10] : "");
      if (n < 1000) return a[Math.floor(n / 100)] + " hundred" + (n % 100 !== 0 ? " and " + numToWords(n % 100) : "");
      return "";
    };

    if (num === 0) return "zero";
    let str = "";
    let i = 0;

    while (num > 0) {
      const part = num % 1000;
      if (part !== 0) {
        const partStr = numToWords(part) + " " + c[i];
        str = partStr + (str ? " " + str : "");
      }
      num = Math.floor(num / 1000);
      i++;
    }

    return str.trim();
  };

  const expectedPrice = sellCarInfo.sellCarData[sellCarStepNames.ExpectedPrice][0]?.value || "";
console.log("expected price.....", expectedPrice)
  useEffect(() => {
    const numericValue = expectedPrice.replace(/,/g, "");
    if (numericValue && !isNaN(numericValue) && Number(numericValue) > 0) {
      setValidPrice(true);
      setPriceInWords(numberToWords(Number(numericValue))); 
    } else {
      setPriceInWords("");
    }
  }, [expectedPrice]);

  const updateExpectedPrice = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    const formattedValue = numericValue ? new Intl.NumberFormat("en-IN").format(Number(numericValue)) : "";
    dispatch(sellCarActions.updateSellCarData({ step: sellCarInfo.activeStep, id: 1, value: formattedValue }));
  };

  const updateStep = () => {
    const numericValue = expectedPrice.replace(/,/g, "");
    if (Number(numericValue) > 0) {
      dispatch(sellCarActions.updateSellCarStep({ step: sellCarInfo.activeStep }));
    } else {
      setValidPrice(false);
    }
  };

  return (
    <>
      {!validPrice && <div className="form_error">Price must be a positive number</div>}
      <div className="input_group input_group_inline width_350_px">
        <span className="text-white flex items-center bg-orange-500 p-3 rounded-l-md">
          <FaRupeeSign />
        </span>
        <input
          type="text"
          className="form_control p-3"
          id="js_expected_price"
          placeholder="Enter your expected price"
          value={expectedPrice}
          onChange={(e) => updateExpectedPrice(e.target.value)}
        />
        <button
          className="gtmEvent_sellCarStep_expectedPrice bg-orange-500 text-white"
          onClick={updateStep}
          disabled={!expectedPrice || Number(expectedPrice.replace(/,/g, "")) <= 0}
        >
          Next
        </button>
      </div>
      {priceInWords && (
        <div className="text-gray-600 mt-2">
          <strong>In Words:</strong> {priceInWords.charAt(0).toUpperCase() + priceInWords.slice(1)} rupees
        </div>
      )}
    </>
  );
}

export default SellCarExpectedPrice;
