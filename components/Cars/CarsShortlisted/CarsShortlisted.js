import CarsShortlistedInner from "./CarsShortlistedInner";
function CarsShortlisted() {

  return (
    <section className="first_section">
      <div className="container">
        <div className="sec-heading">
          <h2>
          Shortlisted <span>Cars</span>
          </h2>
        </div>
        <CarsShortlistedInner />
      </div>
    </section>
  );
}

export default CarsShortlisted;
