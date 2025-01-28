import { useRouter } from 'next/router';
import fetch from 'node-fetch';
import { useGetAdDetailsByCarIdQuery } from '@/store/apiServices/apiServices';
import { setCookie,getCookie } from 'cookies-next';

export default function CarDetails(props) {

  const route = useRouter();
  const {data:carDetails,status} = useGetAdDetailsByCarIdQuery(route.query.id);

  setCookie('clickedCarDetails', carDetails);

  // console.log("clickedCarDetails",getCookie("clickedCarDetails"));

  return ("Hello")
}

// export async function getServerSideProps(context) { 

//   const res = await fetch('https://stagging.jkcarmart.com/jkcm/Usedcars/GetCarListByCarID?carId=488')
//   const repo = await res.json()

//   // const res = await fetch('https://api.publicapis.org/entries')  
//   // const repo = await res.json()

//   console.log("Response", repo); 

//   return { props: { data:[] } }

// }


export async function getServerSideProps({ req, res }) { 

  const clickedCarDetails = getCookie("clickedCarDetails", { req, res });
  console.log("clickedCarDetails", clickedCarDetails);

  try {
    const res = await fetch('https://tcapi.timecentral.co/Api/Device/GetItems');
    const repo = await res.json();
    //console.log("Response", repo); 
    return { props: { data: [] } };
  } catch (error) {
    //console.error('Error fetching data:', error);
    return { props: { data: [] } };
  }
}