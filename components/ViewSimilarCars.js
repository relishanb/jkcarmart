// Extracted from CarInfoDetailed.js
import Link from "next/link";
import CarAdsSwiper from "./Cars/CarsData/CarAdsSwiper";

const ViewSimilarCars = ({ allSimilarCars }) => {
  return (
    <section className="similar_Cars">
      <div className="flex flex-col items-center justify-center">
        <div className="container">
          <div className="sec-heading">
            <h2 className="font-bold text-md md:pb-5">View Similar Cars</h2>
          </div>
          <CarAdsSwiper carAdsList={allSimilarCars} />
        </div>
        <div>
          <Link href="/" className="btn btn_border_primary btn-primary mt-4">
            View other cars
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ViewSimilarCars;