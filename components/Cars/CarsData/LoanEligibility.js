import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { EligibilityForm } from "./EligibilityForm";

const LoanEligibility = ({ carId }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div>
      <div className="flex flex-col items-left justify-center px-4 py-3 border mt-5 rounded-lg bg-white">
        <img src="/loan.svg" alt="Loan Icon" className="w-full h-full" />
        <p className="mt-4 text-lg font-semibold text-black text-left">
          Empowering Every Car Buyer with Flexible Financing Options.
        </p>
        <button
          onClick={openModal}
          className="flex items-center gap-2 justify-center py-2 border-none rounded-lg bg-orange-500 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.43)] text-white font-poppins text-[16px] font-medium leading-[132.5%] cursor-pointer"
        >
          <span className="px-3">Check eligibility</span>
          <FiArrowRight className="ml-2" size={18} />
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative ">
            <EligibilityForm closeModal={closeModal} carId={carId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanEligibility;