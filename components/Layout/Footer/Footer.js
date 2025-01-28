import Link from "next/link";

import FooterCommon from "./FooterCommon";

function Footer() {


  

  return (
    <footer className="footer_area bottom-20">
      <div className="footer_top">
      
        <div className="container">
        <div className="footer_heading">
        <h3 className="footer_heading_title">Buy &amp; Sell used cars in Jammu and Kashmir</h3>
        <div className="footer_heading_div">
          <span className="footer_heading_span">
            Browse and Explore: Start by browsing our extensive listings of used cars in Jammu & Kashmir. To narrow your choices, you can
             filter your search based on make, model, price range, and more. Detailed Listings: Our listings provide comprehensive
              information about each car, including specifications, photos, and the seller's contact details.
               You'll have all the details you need to make an informed decision. Contact the Seller: Once you find a car that you are
                interested in, reach out to the seller directly through our platform to inquire about the car, ask questions, and
                 schedule a test drive.</span>                   
        </div>
        </div>

        
        <hr />


<FooterCommon />
        

          <hr />

          <div className="footer_heading footer_heading_2">
        <h3 className="footer_heading_title">Second Hand Cars in Jammu and Kashmir under Rs 1 lakh, 2 Lakhs, 3 lakhs</h3>
        <div className="footer_heading_div">
          <span className="footer_heading_span">JkCarMart is your one-stop destination for buying used cars in Jammu and Kashmir. We understand that finding the perfect pre-owned car can be thrilling yet challenging, and we're here to make it easier for you.With a wide selection of cars from your districts “Jammu, Srinagar, Kathua, Anantnag, Baramulla, Shopian, Kupwara, Udhampur, Samba, Poonch, Kulgam, Pulwama, Rajouri, Doda, Kishtwar, Ramban, Reasi, Budgam, Ganderbal, Bandipura”, you're bound to discover the ideal car that matches your preferences and budget.</span>

          <span className="footer_heading_span">Buy a second-hand car
          Maruti Suzuki Alto 800, Maruti Suzuki Alto K10, Maruti Suzuki WagonR, Maruti Suzuki Swift, Maruti Suzuki Swift Dzire,
           Maruti Suzuki Vitara Breeza, Hyundai i10, Hyundai i20, Hyundai Verna, Hyundai Creta,
           Mahindra Bolero, Mahindra XUV, Mahindra Scorpio, Tata Safari, Toyota Fortuner
           in Jammu and Kashmir, we're dedicated to providing you with the best possible experience when buying
           J&amp;K Registered second-hand used cars, ensuring you drive away confidently and safely. Start searching for the perfect used car in Jammu and Kashmir today and let us help you find a car that suits your needs and lifestyle.
          </span>
    
        </div>
        </div>


        </div>
        
      </div>
      <div className="footer_bottom">
      <div className="container">
        <div className="footer_bottom_cont">
          <span className="terms_policy">&copy; {new Date().getFullYear()} JKCARMART, owned by People Central Pte Ltd. All rights reserved.</span>
          <span className="terms_policy">
            

            <Link href="/terms" className="terms">Terms and condition</Link>
            <Link href="/privacy" className="terms">Privacy policy</Link>

          </span>
        </div>
      </div>
      </div>
    
    </footer>
  );
}
export default Footer;
