import { EligibilityForm } from "@/components/Cars/CarsData/EligibilityForm";
import EmiAbout from "@/components/Emicalculator/Emiabout";
import EmiCalculator from "@/components/Emicalculator/Emicalculator"; // Assuming you already have this component
import EmiCalculatorSteps from "@/components/Emicalculator/Emisteps";
import LayoutBuy from "@/components/Layout/LayoutBuy";
import Head from "next/head";
import { useState } from "react";

function EmiCalculatorPage() {
  const [showEligibilityModal, setShowEligibilityModal] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const closeModal = () => setShowModal(false);
  return (
    <>
    <Head>
        <title>
        Car Loan EMI Calculator – Easy Financing Tool by JKCarmart
        </title>
        <meta name="description" content="
        Use JKCarmart's EMI Calculator to easily estimate your car loan payments. Plan your finances and explore financing options for a smooth car purchase." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://www.jkcarmart.com/" />
        <meta property="og:title" content="JKCarMart" />
        <meta property="og:site_name" content="JKCarMart" />
        <meta property="og:url" content="https://www.jkcarmart.com" />
        <meta property="og:description" content="Buy and sell Jammu and Kashmir-registered cars on JKCarmart, a free platform connecting buyers and sellers directly, with no agents or hidden costs." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.jkcarmart.com/team.jpg" />
        <meta property="og:image:secure_url" content="https://www.jkcarmart.com/team.jpg" />        
        <meta property="og:image:width" content="1000" />
        <meta property="og:image:height" content="800" />
        <meta property="og:image:alt" content="JKCarMart" />

       
      </Head>
    <LayoutBuy>
    <div className="mt-40 bg-white min-h-screen flex flex-col items-center justify-center">
      <div className="text-center mb-8 md:py-10">
        <h1 className="text-xl md:text-2xl font-medium uppercase tracking-wide">
          Used car loan EMI calculator
        </h1>
        <h2 className="text-4xl md:text-5xl font-bold mt-2 text-orange-500">
          Calculate your monthly payments
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center  mx-auto mb-5">
        <div className="bg-white rounded-lg shadow-lg w-full">
          <EmiCalculator setShowModal={setShowModal} showModal={showModal} />
        </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black bg-opacity-50">
              <EligibilityForm closeModal={closeModal} />
            
              </div>
            )}
            
        {/* <EmiAbout/>
        <EmiCalculatorSteps/> */}
  </LayoutBuy>
  </>
  );
}

export default EmiCalculatorPage;
