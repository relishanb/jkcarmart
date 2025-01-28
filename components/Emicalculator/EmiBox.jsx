import React, { useState } from "react";
import MortgageCalculator from "./Emicalculator"; // Update the path as needed

function EMIBox() {
  const [showBox, setShowBox] = useState(false);

  const toggleBox = () => {
    setShowBox(!showBox);
  };

  return (
    <div className="relative">
      {/* EMI Calculator Button */}
      <button
        onClick={toggleBox}
        className="flex items-center px-4 py-3 bg-orange-500 text-white font-extrabold rounded-lg"
      >
        EMI Calculator
      </button>

      {/* Conditional Rendering of the Box */}
      {showBox && (
        <div className="absolute top-16 right-0 z-10 w-max p-4 bg-white shadow-lg rounded-lg h-96">
          <MortgageCalculator toggleBox={toggleBox} />
        </div>
      )}
    </div>
  );
}

export default EMIBox;
