import styles from './CarDealer.module.scss';
import { FaEnvelope, FaDirections, FaPhoneAlt, FaMapMarkerAlt, FaCar } from "react-icons/fa";
import Card from "@/components/UI/Card";
import { useDispatch } from "react-redux";
import { filterActions } from "@/store/filters";
import { useRouter } from "next/router";
import { useGetDealersQuery } from '@/store/apiServices/apiServices';
import { useEffect, useState } from 'react';
import PaginationViewMore from '@/components/UI/PaginationViewMore';
import { useGetModelsQuery } from "@/store/apiServices/apiServices";
import { LocationIcon, LocationIconJK, PhoneIcon } from '@/components/Layout/Icons/Icons';
import MainLoader from '@/components/Layout/Loaders/MainLoader';
import SkeletonLoading from '@/components/Layout/Loaders/SkeletonLoading';

const CarDealer = () => {

const [pageNumber,setPageNumber] = useState(1);
const [activeDealersList,setActiveDealersList] = useState([]);   

const {data:dealers,refetch} = useGetDealersQuery(pageNumber);
// console.log("dealers");
// console.log(dealers);
const [selectedDealerType, setSelectedDealerType] = useState(null);
const [isLoading, setIsLoading] = useState(true);

const dealerTypes = [
    { type: "All Dealers", district: null },
    { type: "Dealers in Jammu", district: "Jammu" },
    { type: "Dealers in Anantnag", district: "Anantnag" },
    { type: "Dealers in Kathua", district: "Kathua" },
    { type: "Dealers in Udhampur", district: "Udhampur" },
  ];
  
  const filterDealersByDistrict = (selectedDistrict) => {
    setSelectedDealerType(selectedDistrict);
    if (selectedDistrict === null) {
    
      setActiveDealersList(dealers);
    } else {
   
      const filteredDealers = dealers.filter((dealer) => dealer.districtName === selectedDistrict);
  
      if (filteredDealers.length === 0) {
      
        setActiveDealersList([]);
      } else {
    
        setActiveDealersList(filteredDealers);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (dealers) {
      if (pageNumber > 1) {
        // Use a Set to avoid duplicate dealers
        const uniqueDealersSet = new Set([...activeDealersList, ...dealers]);
        const uniqueDealersArray = Array.from(uniqueDealersSet);
        setActiveDealersList(uniqueDealersArray);
      } else {
        setActiveDealersList(dealers);
      }
    }
  }, [dealers, pageNumber]);


    const dispatch = useDispatch();
    const route = useRouter();

   function viewUserCars(userId,name){
    dispatch(filterActions.updateFilterData({filterName:"User", values:[userId,name]}));   
    dispatch(filterActions.applyFilter());    
    route.push("/buy"); 
   }


   const [brandDetails,setBrandDetails] = useState(null);
   function viewUserCarsBrandWise(userId,name,brandId){    
    setBrandDetails({userId,name,brandId});    
   }
   const {data:models} = useGetModelsQuery(brandDetails?.brandId,{skip:brandDetails?false:true});
   useEffect(()=>{
    if(!models) return;
    //console.log("brand"+brandId);
    // console.log("brandDetails");
    // console.log(brandDetails);
    dispatch(filterActions.updateFilterData({filterName:"User", values:[brandDetails.userId,brandDetails.name]}));
    dispatch(filterActions.updateFilterData({filterName:"Brand", brand:brandDetails.brandId, models:models.map(({modelId})=>modelId)}));
    dispatch(filterActions.applyFilter());    
    route.push("/buy"); 
   },[models]);

  //  console.log("Dealers", dealers);



   function showMoreDealers(){
    //console.log("showMoreDealers");
    setPageNumber(prev=>prev+1);
    refetch();
  }


  return (

    <div className={styles.overallDiv}>
    
    <section className="first_section mt-32 md:mt-40">
        <div className="container">
        
            <div className="container">
              <div className={styles.sec_heading}>
                <h2>Find Local Dealers</h2>
                <h3>Explore dealers in your area who offer a range of cars and services for your convenience.</h3>
              </div>

        
               
              {/* <div className={styles.chooseType}>Choose from the following locations.</div>
             
              <div className={styles.listTypes}>
        {dealerTypes.map((typeList, index) => (
          <span
            key={index}
            className={`${styles.listType} ${
              typeList.district === selectedDealerType ? styles.selected : ""
            }`}
            onClick={() => filterDealersByDistrict(typeList.district)}
          >
            {typeList.type}
          </span>
        ))}
      </div> */}

<div className={styles.totalDealers}>
            {isLoading ? (
              <SkeletonLoading />
            ) : activeDealersList && activeDealersList.length > 0 ? (
              <h2>
                {activeDealersList[0].totalUsers} <span>Car Dealers</span>
              </h2>
            ) : (
              <h2 className={styles.noDealersFound}>No Car Dealers Found for {selectedDealerType}</h2>
            )}
          </div>
               {/* <div className="row">
                {filteredVideos.map(({ link, title, img, duration }, index) => (
                  <VideoComp key={index} link={link} title={title} img={img} duration={duration} />
                ))}
              </div> */}
            
            

     {/* activeDealersList && activeDealersList.length > 0 && */}



     <div className={styles.dealers_list}>
                {activeDealersList.map((dealer,index) => {


                const brands = dealer.brandlist.split(',');

                 //console.log(brands);


 return(
                 <div key={index} className={styles.dealer_details}>


 <Card className={styles.card}>
                     <div className={styles.card}>
                         <div className={styles.dealer_image} onClick={()=>viewUserCars(dealer.user_ID,dealer.firstName)}>                            
                             <img src={`${dealer.dealerImagesList?.length > 0 ? dealer.dealerImagesList[0] : "/car-dealer.jpg"}`} alt="..." />
                         </div>
                         <div className={styles.card_body}>
                             <div className={styles.dealer_detail}>
                                 <div className={styles.head_section}>
                                     <div className={styles.title}>
                                         <p title={`View All Cars From ${dealer.firstName}`} className={`${styles.name} pb-4`} onClick={()=>viewUserCars(dealer.user_ID,dealer.firstName)}>{dealer.firstName}</p>
                                     
                                        
                                         {/* <p className={styles.cars}><span title={`View All ${dealer.totalCars} Cars From ${dealer.firstName}`} className={styles.link} onClick={()=>viewUserCars(dealer.user_ID,dealer.firstName)}><FaCar className={styles.fa_icon} />{dealer.totalCars} Cars</span></p> */}
                                        
                                     </div>
                                
                                     {/* <div className={styles.icons}>
                                         <a href={'tel:' + dealer.mobileNo} className={styles.icon}> <FaPhoneAlt /></a>
                                         {dealer.emailID && dealer.emailID !="" && <a href={'mailto:' + dealer.emailID} className={styles.icon}> <FaEnvelope /></a>}
                                     </div> */}
                                 </div>

                                 <div >
                                 {/* <p><FaPhoneAlt className={styles.fa_icon} /> <a href={'tel:' + dealer.mobileNo}>{dealer.mobileNo}</a></p> */}
                                 {/* {dealer.emailID && dealer.emailID !="" && <p><FaEnvelope className={styles.fa_icon} /> <a href={'mailto:' + dealer.emailID}>{dealer.emailID}</a></p>} */}
                                 {/* {dealer.districtName && dealer.districtName !="" && <p><FaMapMarkerAlt className={styles.fa_icon} /> {dealer.districtName}</p>} */}
                                 {dealer.address1 && dealer.address1 !="" && <p className={styles.address}> {dealer.address1}</p>}
                             </div>

                             <div className={styles.dealsIn}>Deals in</div>
                                 <div className={`${styles.link_brands}`}> {brands?.map((brand,index)=><span title={`View All ${brand.split('|')[1]} Cars From ${dealer.firstName}`} key={index} className={styles.link} onClick={()=>viewUserCarsBrandWise(dealer.user_ID,dealer.firstName,parseInt(brand.split('|')[0]))}>{`${index!=0?",":""} ${brand.split('|')[1]}`}</span>)} </div>

                                 <div className={styles.horizontalLine}>
                                
                                 </div>

                                 <div className={styles.contactItem}>
                                 <div className={styles.location}><PhoneIcon className={styles.fa_icon}  /> <a href={'tel:' + dealer.mobileNo}><span>{dealer.mobileNo}</span></a></div>
                                 {/* {dealer.emailID && dealer.emailID !="" && <p><FaEnvelope className={styles.fa_icon} /> <a href={'mailto:' + dealer.emailID}>{dealer.emailID}</a></p>} */}
                                 {dealer.districtName && dealer.districtName !="" && <div className={styles.location}><LocationIconJK  className={styles.fa_icon}/><span>{dealer.districtName}</span></div>}
                                 {/* {dealer.address1 && dealer.address1 !="" && <p className={styles.address}> {dealer.address1}</p>} */}
                             </div>

                             <div className={styles.button}>
                             <span><p className={styles.cars}><span title={`View All ${dealer.totalCars} Cars From ${dealer.firstName}`} className={styles.link} onClick={()=>viewUserCars(dealer.user_ID,dealer.firstName)}>View all {dealer.totalCars} cars</span></p> </span>
                             </div>
                             {/* <div className={styles.contact_details}>
                                 <p><FaPhoneAlt className={styles.fa_icon} /> <a href={'tel:' + dealer.mobileNo}>{dealer.mobileNo}</a></p>
                                 {dealer.emailID && dealer.emailID !="" && <p><FaEnvelope className={styles.fa_icon} /> <a href={'mailto:' + dealer.emailID}>{dealer.emailID}</a></p>}
                                 {dealer.districtName && dealer.districtName !="" && <p><FaMapMarkerAlt className={styles.fa_icon} /> {dealer.districtName}</p>}
                                 {dealer.address1 && dealer.address1 !="" && <p><FaDirections className={styles.fa_icon} /> {dealer.address1}</p>}
                             </div> */}
                             </div>
                         </div>

                       


                     </div>

                     </Card>



                 </div>
 )


                }
               
               
               
                )}
                
                 </div>
         


 {activeDealersList?.length > 0 && <PaginationViewMore text="Dealers" activeRecords={activeDealersList?.length} totalRecords={activeDealersList[0]?.totalUsers} onClick={showMoreDealers} /> }
          </div>
        </div>
      </section>

{/* selectedVideoType === typeList.type ? styles.selectedListType :  */}
    </div>
  
  );
 
};

export default CarDealer;
