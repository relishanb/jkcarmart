import Image from 'next/image';
import { FaCircle } from 'react-icons/fa';
import emi from "@/components/StaticPages/emi.png"
const EmiCalculatorSteps = () => {
  const steps = [
    {
      title: 'Loan amount',
      description:
        'Choose the amount you plan to borrow for your used car purchase. This is the principal amount you need to finance your vehicle.',
    },
    {
      title: 'Loan tenure',
      description:
        'Select the loan tenure or the number of months you want to take to repay the loan. The EMI calculator will instantly display your estimated monthly instalment.',
    },
    {
      title: 'Interest rate',
      description:
        'Adjust the interest rate to see how it impacts your EMI. This rate is decided by the lender based on several factors.',
    },
  ];

  return (
    <div className="bg-gray-100 py-10 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 lg:flex-row items-center">
        {/* Left Section: Steps */}
        <div className="w-full lg:w-2/3">
          <h2 className="text-3xl font-bold text-black mb-8">
            How to use the <span className="text-orange-500">EMI calculator?</span>
          </h2>
          <div className="space-y-6">
  {steps.map((step, index) => (
    <div
      key={index}
      className="bg-white p-6 rounded-lg shadow flex items-start space-x-4"
    >

      <div className=' size-12'>

      <div className="flex items-center justify-center bg-orange-100  w-full h-full rounded-full">
        {/* Use text-center and flex utilities for proper alignment */}
        <span className="text-xl font-bold text-orange-500">
          {index + 1}
        </span>
      </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-black">{step.title}</h3>
        <p className="text-gray-600">{step.description}</p>
      </div>
    </div>
  ))}
</div>
</div>

        {/* Right Section: Calculator Image */}
        <div className="w-full lg:w-1/3 flex justify-center mt-8 lg:mt-0">
          <Image
            src={emi} // Replace this with the correct path to your image
            alt="Calculator Illustration"
            width={400}
            height={300}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default EmiCalculatorSteps;
