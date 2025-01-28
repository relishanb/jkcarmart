import React from 'react';
import { useState,  useRef } from 'react';
import styles from './About.module.scss'
import useSticky from './useSticky';
import Image from "next/image";
import AboutPlatformComp from './AboutPlatformComp';
import { SellPlatformData, SearchPlatformData, BuyPlatformData } from './AboutPlatformContent';
import FeaturesComp from './FeaturesComp';
import Link from 'next/link';


const About=() => {

    const refSection1 = useRef(null);
    const refSection2 = useRef(null);
    const refSection3 = useRef(null);


    const scrollDown = (refSection) =>  {
        window.scrollTo({
          top: refSection.current.offsetTop,
          behavior: 'smooth' 
        }); 
      }

      const { sticky, stickyRef } = useSticky();

    const featureData = [
        {id: "feature1", title: "Easy to Sell", img: require("./sell.png")},
        {id: "feature2", title: "Easy to Search", img: require("./search.png")},
        {id: "feature3", title: "Easy to Buy", img: require("./buy.png")},
      ];



      const [selectedId, setSelectedId] = useState(null);

  const onChange = (id) => {
    console.log({ id, selectedId });
    setSelectedId(id === selectedId ? null : id); //To close the Menu if its already opened
  };


    return (
      <>

        {/* <section ref={stickyRef}  className={`${styles.about_area} ${ sticky } ${sticky ? "sticky": ""}`}>
      <div className='container'>
          <div className='row'>
          <div className={` ${styles.features_container}`}>
          {featureData.map(({id, title, img},index) => (
                                  <FeaturesComp key={index} id={id} title={title}  img={img} onChange={onChange}
                                  selectedId={selectedId}  scrollDown={()=>scrollDown(index===0?refSection1:(index===1)?refSection2:refSection3)} />
        ))}
        

          </div>
          </div>
      
        </div>
      </section> */}

      <section className="first_section">
        <div className='container'>
            <div className='row'>
                <div className='col-lg-12'>
                <h3 className='head'>JKCarMart is Jammu &amp; Kashmir's <span className="color-primary">#1 Used Car platform</span> for buyers and sellers<span className='bdr_bt'></span></h3>
                <div className={styles.team_image}><img src="/team.jpg" /></div>
                <p>JKCarMart is a free platform for buying and selling used cars in Jammu and Kashmir. We pride in connecting buyers directly with sellers; without any middlemen or salespeople in between.</p>
                <p>Exclusively only for J&K registered cars, the platform is built on the ideology to simplify the car searching process so that buyers or sellers can get the best result as quickly as possible.</p>
                <p>With JKCarMart's innovative approach buyers get a huge selection at low prices and develop trust while sellers get access to thousands of online shoppers. Users can register on this website and on the dashboard the user can list, classify, buy, and sell cars online.</p>
            </div>
            </div>
        </div>
      </section>
      
      <section className={styles.block} ref={refSection1}>
        <div className={`${styles.sell} ${styles.sec_padding} ${styles.bg_grey}`}>
            <div className='container'>
                <div className='row align-items-center'>
                    <div className='col-lg-7'>
                        <div className={styles.section_title}>
                            <h3 className='head'>Sell Cars Online<span className='bdr_bt'></span></h3>
                            <p className={styles.content}>Are you eager to sell your car for a long time but unable to find your perfect match buyer?</p>
                            <p>Well, we have the solution for you; simply Sell cars in Jammu/Srinagar by posting pictures of your car with the required and efficient information. Set your price range, wait for interested buyers based on your preferences, and Sell used Cars seamlessly.</p>
                            <p>All the buyers will connect with you purely on the basis of contact information provided by you without any meddling in between. </p>
                            <p>We are your support mechanism and helping hand to hand you over with what you aspire for!</p>
                        </div>
                    </div>
                    <div className='col-lg-5'>
                        <div className={styles.car_image}>
                            <Image src={require('./sell-car.png')} alt=''/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.platform_area}>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className={styles.section_title}>
                            <h3 className='head'>A Platform to Sell Cars Online<span className='bdr_bt'></span></h3>
                            <p>
                                We are transforming the selling of cars seamlessly and within a small amount of time; we are proud to assist you with a platform that serves and believes in easy transactions and trading to Sell used Cars.
                                Sell Cars in Jammu/Srinagar without any barriers and hurdles.
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className='row'>
                {SellPlatformData.map(({ title, content, img }, index) => (
                                  <AboutPlatformComp key={index} title={title} content={content}  img={img} />
        ))}
                </div>
            </div>
        </div>
        <div className={`${styles.fact_bg} ${styles.sec_padding}`}>
            <div className={styles.fact_area_title}>Personalize Your Car Selling Now! <span className={styles.left}></span><span className={styles.right}></span></div>
            <div className='container'>
                <div className='row align-items-center justify-content-center'>
                    <div className='col-lg-10'>
                        <div className={styles.text}>
                            <h3>Sell Cars in Jammu/Srinagar and get ready and all set to say a very pleasant farewell to your car based on your choices</h3>
                            <Link href="/" className={styles.text_btn}>Explore</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section   className={styles.block} ref={refSection2}>
        <div className={`${styles.sell} ${styles.sec_padding} ${styles.bg_grey}`}>
            <div className='container'>
                <div className='row align-items-center'>
                    <div className='col-lg-7'>
                        <div className={styles.section_title}>
                            <h3 className='head'>Quick Search for Buyers &amp; Sellers<span className='bdr_bt'></span></h3>
                            <p className={styles.content}>Are you occupied with a lot of questions about finding a suitable buyer &amp; seller for Used Cars in Jammu at the best price?</p>
                            <p>Well, if yes, we are here for you. Pick up your choice between a buyer or seller of a car, set your price range, select the vehicle you want, and then select a wide range of lists to Buy used Cars in Srinagar.</p>
                            <p>If you are a seller, then fill out your information about your cars and pick up the price range for the car; enter your contact information for your buyers, and it's done.</p>
                        </div>
                    </div>
                    <div className='col-lg-5'>
                        <div className={styles.car_image}>
                            <Image src={require('./search-car.png')} alt='' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.platform_area}>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className={styles.section_title}>
                            <h3 className='head'>A Platform for All Your Searches<span className='bdr_bt'></span></h3>
                            <p>
                            We stand out for all the automobile enthusiasts and ponders looking forward to their new vehicles or the ones ready to sell. If you are one of these, then you are at the right place, so get ready to get what you desire. All the buyers can look out for elongated various brands and models of Used Cars in Jammu &amp; Kashmir.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='row'>
                {SearchPlatformData.map(({ title, content, img }, index) => (
                                  <AboutPlatformComp key={index} title={title} content={content}  img={img} />
        ))}
                </div>
            </div>
        </div>
        <div className={`${styles.fact_bg} ${styles.sec_padding}`}>
            <div className={styles.fact_area_title}>Personalize Your Car Search Experience Now!  <span className={styles.left}></span><span className={styles.right}></span></div>
            <div className='container'>
                <div className='row align-items-center justify-content-center'>
                    <div className='col-lg-10'>
                        <div className={styles.text}>
                            <h3>Search for the car you want or find the buyers for the Used Cars in Kashmir you wish to sell without any delay</h3>
                            <Link href="/" className={styles.text_btn}>Explore</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section  className={styles.block} ref={refSection3}>
        <div className={`${styles.sell} ${styles.sec_padding} ${styles.bg_grey}`}>
            <div className='container'>
                <div className='row align-items-center'>
                    <div className='col-lg-7'>
                        <div className={styles.section_title}>
                            <h3 className='head'>Buy Used Cars in Jammu &amp; Kashmir Online<span className='bdr_bt'></span></h3>
                            <p className={styles.content}>Are you ready to bring your dream car to your home?</p>
                            <p>Yes, so why are you still waiting? Pick up your choice of car from thousands of options and directly connect with the sellers with no meddling by anyone in between.</p>
                            <p>Buy used Cars in Srinagar that are all verified and reviewed by our team to ensure that all the cars' photos &amp; information are accurate so that all the sellers can freely choose their vehicles without any flaws.</p>
                        </div>
                    </div>
                    <div className='col-lg-5'>
                        <div className={styles.car_image}>
                            <Image src={require('./buy-car.png')} alt='' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.platform_area}>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className={styles.section_title}>
                            <h3 className='head'>Online Platform to Buy Used Cars in Kashmir<span className='bdr_bt'></span></h3>
                            <p>
                            Set your car preference, and you are all set to go! Find the contact information of all the buyers, including pictures, to Buy used Cars in Jammu.
                            </p>
                            <p>In case you have any other doubts, you can connect with us and find the solutions to all your queries.</p>
                        </div>
                    </div>
                </div>
                <div className='row'>
                {BuyPlatformData.map(({ title, content, img }, index) => (
                                  <AboutPlatformComp key={index} title={title} content={content}  img={img} />
        ))}
                </div>
            </div>
        </div>
        <div className={`${styles.fact_bg} ${styles.sec_padding}`}>
            <div className={styles.fact_area_title}>Personalize Your Car Trading Now! <span className={styles.left}></span><span className={styles.right}></span></div>
            <div className='container'>
                <div className='row align-items-center justify-content-center'>
                    <div className='col-lg-10'>
                        <div className={styles.text}>
                            <h3>Be excited to buy your car as your preferences and choices</h3>
                            <Link href="/" className={styles.text_btn}>Explore</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
      </>
    );
  }
 export default About;