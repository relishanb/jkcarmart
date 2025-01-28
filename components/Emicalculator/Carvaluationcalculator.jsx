// import React, { useState } from 'react';

// const CarValuationCalculator = () => {
//   const [purchasePrice, setPurchasePrice] = useState(0);
//   const [mileage, setMileage] = useState(0);
//   const [ratePerKm, setRatePerKm] = useState(4);
//   const [carValue, setCarValue] = useState(0);

//   const calculateValue = () => {
//     const mileageAdjustment = mileage * ratePerKm;
//     const value = purchasePrice - mileageAdjustment;
//     setCarValue(value);
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
//       <h2 className="text-2xl font-bold mb-4 text-center">Car Valuation Calculator</h2>
//       <div className="mb-4">
//         <label className="block text-gray-700">Purchase Price (₹):</label>
//         <input
//           type="number"
//           value={purchasePrice}
//           onChange={(e) => setPurchasePrice(Number(e.target.value))}
//           className="w-full px-3 py-2 border rounded-md"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Kilometers Driven:</label>
//         <input
//           type="number"
//           value={mileage}
//           onChange={(e) => setMileage(Number(e.target.value))}
//           className="w-full px-3 py-2 border rounded-md"
//         />
//       </div>
//       <button
//         onClick={calculateValue}
//         className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
//       >
//         Calculate
//       </button>
//       <h2 className="text-xl font-bold mt-4 text-center">Estimated Car Value: ₹{carValue}</h2>
//     </div>
//   );
// };

// export default CarValuationCalculator;
