import Head from 'next/head'
import { Inter } from '@next/font/google'
import CarInfoDetailed from '@/components/Cars/CarsData/CarInfoDetailed'
import Layout from '@/components/Layout/Layout';

import { Router, useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] });

import Integrations from '@/pages/integrations/integrations'

import LightBox from '@/components/UI/LightBox';
import { lightBoxActions } from '@/store/lightBox';

import { useGetAdDetailsByCarIdQuery } from '@/store/apiServices/apiServices';

import { setCookie,getCookie,deleteCookie } from 'cookies-next';

export default function CarDetails(props) {

  const router = useRouter();

  console.log("props",props);
const carInfo = props.clickedCarDetails;


  const route = useRouter();

  const {data:carDetails,status} = useGetAdDetailsByCarIdQuery(route.query.id);


  let expectedPrice;

  if(carDetails) {

    

    if(carInfo.expectedPrice >= 100000){
      expectedPrice = numDifferentiation(carInfo.expectedPrice);
   }
   else{
      expectedPrice = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(carInfo.expectedPrice);
   }   


   const carInfoApi = {brand:carDetails.brandName, carId:carDetails.car_ID, variant:carDetails.variantName,carExpectedPrice:expectedPrice, ...carDetails};
   deleteCookie('clickedCarDetails');
   setCookie('clickedCarDetails', JSON.stringify(carInfoApi));

   if(carInfoApi.carId != carInfo.carId) router.reload();

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

    <>
      <Head>
        <title>{`${carInfo.brandName} ${carInfo.modelName} | ${carInfo.totalDriven} kilometers | Rupees ${carInfo.carExpectedPrice}`}</title>
        <meta name="description" content="Buy and Sell Used Cars in Jammu and Kashmir" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />



        <meta property="og:title" content={`${carInfo.brand} ${carInfo.modelName}`} />
        <meta property="og:site_name" content="JKCarMart" />
        <meta property="og:url" content={`https://www.jkcarmart.com/car/details/${carInfo.carId}`} />
        <meta property="og:description" content={`${carInfo.modelYear} | ${carInfo.totalDriven} kilometers | ${carInfo.carExpectedPrice}`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={carInfo.carImagesList?carInfo.carImagesList[0]:""} />
        <meta property="og:image:secure_url" content={carInfo.carImagesList?carInfo.carImagesList[0]:""} />
        {/* <meta property="og:image:type" content="image/png" /> */}
        <meta property="og:image:width" content="1000" />
        <meta property="og:image:height" content="800" />
        <meta property="og:image:alt" content="JKCarMart" />


      </Head>

      
<Integrations />

<div className={lightBoxDetails?.isActive?"lightbox_active":""}>
<Layout>

<CarInfoDetailed id={route.query.id} carInfo={carInfo} />



</Layout>
</div>
  
{lightBoxDetails?.isActive && <LightBox width="full_width_center" close={hideFullImage} ><img src={lightBoxDetails.url}  /></LightBox>}
  
      
    </>




  )
}



export async function getServerSideProps({ req, res }) { 
  let clickedCarDetails = [];
  if(getCookie("clickedCarDetails", { req, res })) clickedCarDetails = JSON.parse(getCookie("clickedCarDetails", { req, res }));
  console.log("clickedCarDetails", clickedCarDetails);
  return { props: {clickedCarDetails} };
}