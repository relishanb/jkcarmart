const EmiAbout = () => {
    return (
      <section className="bg-orange-200 text-white py-10">
        <div className="container mx-auto px-4 lg:px-10 flex flex-col lg:flex-row items-center gap-6">
          {/* Left Side */}
          <div className="lg:w-1/3">
            <h2 className="text-2xl lg:text-3xl font-bold text-black">
              What is <span className="text-black">EMI calculator?</span>
            </h2>
          </div>
          
          {/* Right Side */}
          <div className="lg:w-2/3">
            <p className="text-sm lg:text-base text-gray-900">
              Want to buy a pre-owned car but unsure of how it’s going to affect
              your budget? The CARS24 loan EMI calculator is a convenient,
              automated tool that simplifies your pre-owned car loan planning.
              Simply input your loan amount (principal amount) and down payment,
              select the tenure and interest rate, and discover your monthly loan
              instalments.
            </p>
            <p className="mt-4 text-sm lg:text-base text-gray-900">
              Use the CARS24 EMI calculator and plan your pre-owned car loan
              instalment with ease!
            </p>
          </div>
        </div>
      </section>
    );
  };
  
  export default EmiAbout;
  