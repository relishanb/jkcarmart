import { useCallback } from "react";
import styles from "./getStarted.module.scss";
import { useRouter } from "next/router";

const GetStarted = ({ onNextClick }) => {
  const router = useRouter();

  const handleNextClick = useCallback(() => {
    onNextClick("businessInfoPage");

    window.scrollTo(0, 0);
  }, [onNextClick]);

  
  return (
    <div className={styles.gettingStartedPage}>
      <div className={styles.frameParent}>
        <div className={styles.frameWrapper}>
          <div className={styles.frameContainer}>
            <div className={styles.getOnlineCustomersForYourParent}>
              <div className={styles.getOnlineCustomersContainer}>
                <span>Get Online </span>
                <span className={styles.customers}>Customers</span>
                <span> for Your Business</span>
              </div>
              <div className={styles.addYourBusiness}>
                Add your business here for free and help online customers
                discover your business
              </div>
            </div>
          </div>
        </div>
        <div className={styles.frameChild} />
      </div>
      <div className={styles.gettingStartedPageChild} />
      <div className={styles.frameGroup}>
        <div className={styles.getStartedWrapper}>
          <div className={styles.getStarted} onClick={handleNextClick}>
            Get Started
          </div>
        </div>

        <div className={styles.frameDiv}>
          <div className={styles.frameParent1}>
            <div className={styles.parent}>
              <b className={styles.b}>4</b>
              <img
                className={styles.frameItem}
                alt=""
                src="/frame-518@2x.png"
              />
            </div>
            <div className={styles.addPictures}>
              <span className={styles.add}>
                Add <br /> Pictures
              </span>
              {/* <p className={styles.pictures}></p> */}
            </div>
          </div>
          <div className={styles.frameParent2}>
            <div className={styles.group}>
              <b className={styles.b}>3</b>
              <img
                className={styles.frameInner}
                alt=""
                src="/frame-519@2x.png"
              />
            </div>
            <div className={styles.addPictures}>
              <span className={styles.add}>Select your timings</span>
              {/* <p className={styles.pictures}> </p> */}
            </div>
          </div>
          <img className={styles.vectorIcon} alt="" src="/vector-17.svg" />
          <div className={styles.frameParent3}>
            <div className={styles.container}>
              <b className={styles.b}>2</b>
              <img
                className={styles.frameIcon}
                alt=""
                src="/frame-517@2x.png"
              />
            </div>
            <div className={styles.addPictures}>
              <span className={styles.add}>Choose Category & Services</span>
              {/* <p className={styles.pictures}></p> */}
            </div>
          </div>
          <img className={styles.frameChild1} alt="" src="/vector-16.svg" />
          <img className={styles.frameChild2} alt="" src="/vector-22.svg" />
          <div className={styles.frameParent4}>
            <div className={styles.parent1}>
              <b className={styles.b}>1</b>
              <img
                className={styles.frameChild3}
                alt=""
                src="/frame-516@2x.png"
              />
            </div>
            <div className={styles.addPictures}>
              <span className={styles.add}>Fill business details</span>
              {/* <p className={styles.pictures}> </p> */}
            </div>
          </div>
        </div>
        <div className={styles.completeYourListingInFewEParent}>
          <div className={styles.getStarted}>
            Complete Your Listing in few easy steps
          </div>
          <div className={styles.fillOutYour}>
            Fill out your business profile with all the relevant information
            about car service offerings, contact information, operating hours,
            and any other relevant details.
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
