import { Inter } from '@next/font/google'
const inter = Inter({ subsets: ['latin'] });

import store from '@/store';
import { getAdDetailsByCarId,getColors,getRunningQueriesThunk } from '@/store/apiServices/apiServices';
//import { getBlogPosts,getRunningQueriesThunk } from '@/store/apiServices/apiServicesBlogs';


export default function CarDetails(props) {
  return ("Hello")
}


export async function getServerSideProps(context) {

  // const carId = parseInt(context.params.id);
  // console.log("id",carId);

  // const response = await store.dispatch(getColors.initiate());
  // await Promise.all(store.dispatch(getRunningQueriesThunk()));


  const res = await fetch('https://stagging.jkcarmart.com/jkcm/Usedcars/GetCarListByCarID?carId=488')
  const repo = await res.json()

  // const res = await fetch('https://blog.jkcarmart.com/wp-json/wp/v2/posts?per_page=2')
  // const repo = await res.json()

  console.log("car data 3"); 

  console.log(repo); 

  return { props: { data:[] } }

}