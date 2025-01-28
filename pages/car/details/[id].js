import Head from 'next/head'
import { Inter } from '@next/font/google'
import CarInfoDetailed from '@/components/Cars/CarsData/CarInfoDetailed'
import Layout from '@/components/Layout/Layout';

import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';



const inter = Inter({ subsets: ['latin'] });



import LightBox from '@/components/UI/LightBox';
import { lightBoxActions } from '@/store/lightBox';

import { useGetAdDetailsByCarIdQuery } from '@/store/apiServices/apiServices';



export default function CarDetails() {

  const route = useRouter();

  const {data:carDetails,status} = useGetAdDetailsByCarIdQuery(route.query.id);

  let carInfo;
  let expectedPrice;

  if(carDetails) {    

    if(carDetails.expectedPrice >= 100000){
      expectedPrice = numDifferentiation(carDetails.expectedPrice);
   }
   else{
      expectedPrice = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(carDetails.expectedPrice);
   }   

   carInfo = {brand:carDetails.brandName, carId:carDetails.car_ID, variant:carDetails.variantName,carExpectedPrice:expectedPrice, ...carDetails};

  }


  function numDifferentiation(val) {
    if (val >= 10000000) {
      val = (val / 10000000).toFixed(2);
      if(parseInt(val.slice(-2)) < 1) val = val.substring(0, val.length-3);
      val = val + ' Crore';
    } else if (val >= 100000) {
      val = (val / 100000).toFixed(2);
      if(parseInt(val.slice(-2)) < 1) val = val.substring(0, val.length-3);
      val = val + ' Lakh';
    }  
    return val;
  }
  
  new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(80000)
  
  

const lightBoxDetails = useSelector(state=>state.lightBox);

const dispatch = useDispatch();
function hideFullImage(){  
  dispatch(lightBoxActions.hideLightBox());
}



  return (    

    status == "fulfilled" && carInfo && 

    <>
      <Head>
        <title>{`${carInfo.brandName} ${carInfo.modelName} | ${carInfo.totalDriven} kilometers | Rupees ${carInfo.carExpectedPrice}`}</title>
        <meta name="description" content="Buy and Sell Used Cars in Jammu and Kashmir" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />



        <meta property="og:title" content="Car you may be Interested" />
        <meta property="og:site_name" content="JKCarMart" />
        {/* <meta property="og:url" content="https://www.jkcarmart.com" /> */}
        <meta property="og:description" content="I am sharing car details may be you interested to buy! Check below all details" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.jkcarmart.com/sample_car.jpg" />
        <meta property="og:image:secure_url" content="https://www.jkcarmart.com/sample_car.jpg" />
        {/* <meta property="og:image:type" content="image/png" /> */}
        <meta property="og:image:width" content="500" />
        <meta property="og:image:height" content="313" />
        <meta property="og:image:alt" content="JKCarMart" />

       


      </Head>

      


<div className={lightBoxDetails?.isActive?"lightbox_active":""}>
<Layout>

<CarInfoDetailed id={route.query.id} carInfo={carInfo} />



</Layout>
</div>
  
{lightBoxDetails?.isActive && <LightBox width="full_width_center" close={hideFullImage} ><img src={lightBoxDetails.url}  /></LightBox>}
  
      
    </>




  )
}