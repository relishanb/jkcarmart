import SellCarInner from "./SellCarInner";
function SellCar() {
  return (
    <>
      <section className="first_section mt-20 md:mt-32">
        <div className="container">
          <div className="sec-heading">
            <h2>
              Sell <span>Car</span>
            </h2>
          </div>
          <SellCarInner />
        </div>
      </section>

      <section className="bg-orange-200">
        <div className="container">
          <div className="sec-heading">
            <h2>
              Sell Used Cars in Jammu
            </h2>
          </div>
          <p>
            Ready to part ways with your car?
          </p>
          <p>
            Sell it hassle-free on JK Carmart the best site to sell car with maximum visibility. Explore the process to sell old car in Jammu.
          </p>
          <p><strong>Here is How You Can Sell Used Cars?</strong></p>
          <ul className="list_dotted">
            <li><strong>List:</strong> Create compelling ads with details and pictures about your car.</li>
            <li><strong>Connect:</strong> Respond to inquiries and connect with potential buyers.</li>
            <li><strong>Close the Deal:</strong> Finalize the deal in person and hand over the keys.</li>
          </ul>
        </div>
      </section>

    </>
  );
}
export default SellCar;
