import React, { useState, useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";

const EmiCalculator2 = ({ setShowModal, showModal, defaultLoanAmount }) => {
  const [loanAmount, setLoanAmount] = useState(defaultLoanAmount || 200000);
  const [tenure, setTenure] = useState(60);
  const [interestRate, setInterestRate] = useState(10);
  const [emi, setEmi] = useState(0);
  const [totalPayable, setTotalPayable] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  const calculateEMI = () => {
    const principal = loanAmount;
    const rate = interestRate / 12 / 100;
    const time = tenure;

    const emi =
      (principal * rate * Math.pow(1 + rate, time)) /
      (Math.pow(1 + rate, time) - 1);
    const totalPayable = emi * time;
    const totalInterest = totalPayable - principal;

    setEmi(emi.toFixed(0));
    setTotalPayable(totalPayable.toFixed(0));
    setTotalInterest(totalInterest.toFixed(0));
  };

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, tenure, interestRate]);

  return (
    <div className="flex flex-col rounded-lg bg-gray-900 text-white lg:h-full h-[550px] px-4 py-4 w-full lg:w-[740px] overflow-y-auto z-10">
      {/* Left Section */}
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
        {/* Inputs Section */}
        <div className="bg-white text-gray-900  p-4 sm:p-6 w-full rounded-lg shadow-md space-y-6">
          {/* Loan Amount */}
          <div>
            <label className="block font-semibold mb-2 text-sm">Loan amount</label>
            <div className="block w-full text-center text-lg font-semibold bg-gray-100 rounded-lg p-2 mb-2">
              ₹{loanAmount.toLocaleString()}
            </div>
            <input
              type="range"
              min={10000}
              max={5000000}
              step={10000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full accent-orange-500"
            />
            <div className="flex justify-between text-xs sm:text-sm mt-2">
              <span>₹10,000</span>
              <span>₹50,00,000</span>
            </div>
          </div>

          {/* Tenure */}
          <div>
            <label className="block font-semibold mb-2 text-sm">Tenure</label>
            <div className="block w-full text-center text-lg font-semibold bg-gray-100 rounded-lg p-2 mb-2">
              {tenure} months
            </div>
            <input
              type="range"
              min={12}
              max={72}
              step={1}
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full accent-orange-500"
            />
            <div className="flex justify-between text-xs sm:text-sm mt-2">
              <span>12 months</span>
              <span>72 months</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <label className="block font-semibold mb-2 text-sm">Interest rate</label>
            <div className="block w-full text-center text-lg font-semibold bg-gray-100 rounded-lg p-2 mb-2">
              {interestRate}%
            </div>
            <input
              type="range"
              min={0}
              max={20}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-orange-500"
            />
            <div className="flex justify-between text-xs sm:text-sm mt-2">
              <span>0%</span>
              <span>20%</span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-gray-800 text-white p-4 sm:p-6 md:p-8 w-full rounded-lg shadow-md space-y-6">
          {/* Indicative EMI */}
          <div>
            <h3 className="text-lg font-semibold">Indicative EMI</h3>
            <div className="w-[94px]  text-3xl sm:text-4xl font-bold text-orange-500 mt-2">
              ₹{parseInt(emi).toLocaleString()}/month
            </div>
          </div>

          {/* Pie Chart */}
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto">
            <svg viewBox="0 0 36 36" className="w-full h-full">
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="#374151"
                strokeWidth="4"
              />
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="#f97316"
                strokeWidth="4"
                strokeDasharray={`${(totalInterest / totalPayable) * 100} ${
                  100 - (totalInterest / totalPayable) * 100
                }`}
                strokeDashoffset="25"
              />
            </svg>
          </div>

          {/* Color Indicators */}
          <div className="flex justify-center gap-4 text-xs sm:text-sm">
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-orange-500 mr-2"></span>
              Interest
            </div>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gray-500 mr-2"></span>
              Loan Amount
            </div>
          </div>

          {/* Loan Breakdown */}
          <div className="text-xs sm:text-sm">
            <div className="flex justify-between mb-2">
              <span>Loan amount</span>
              <span>₹{parseInt(loanAmount).toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Interest @{interestRate}% p.a.</span>
              <span>+ ₹{parseInt(totalInterest).toLocaleString()}</span>
            </div>
            <hr className="border-gray-700 my-2" />
            <div className="flex justify-between text-sm sm:text-lg font-bold">
              <span>Total amount</span>
              <span>₹{parseInt(totalPayable).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-4 bg-gray-900">
        <div className="flex flex-col items-center bg-white p-4 rounded-md">
          <p className="text-xs sm:text-sm text-gray-600 mb-2 text-center">
            Need help in financing or eligibility? Jkcarmart will help you with this too.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center text-white text-sm sm:text-md font-semibold py-2 px-4 bg-orange-500 rounded-md"
          >
            Check Eligibility <FiArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmiCalculator2;
