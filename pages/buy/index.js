import Head from 'next/head'

import { Inter } from '@next/font/google'

import CarsList from '@/components/Cars/CarsData/CarsList'


import LayoutBuy from '@/components/Layout/LayoutBuy'

import store from '@/store';
import { getLatestBlogPosts,getRunningQueriesThunk } from '@/store/apiServices/apiServicesBlogs';



const inter = Inter({ subsets: ['latin'] })

export default function Home(props) {
  return (
    <>
      <Head>
        <title>
        Buy Used Cars in Jammu and kashmir – Easy, Fast, and Free!
        </title>
        <meta name="description" content=" 
 	       
 	
Explore a wide range of used cars in Jammu & Kashmir on JKCarMart. Find reliable, affordable, and Jammu & Kashmir-registered vehicles without hidden charges" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://www.jkcarmart.com/" />
        <meta property="og:title" content="JKCarMart" />
        <meta property="og:site_name" content="JKCarMart" />
        <meta property="og:url" content="https://www.jkcarmart.com" />
        <meta property="og:description" content="Buy and Sell Used Cars in Jammu and Kashmir" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.jkcarmart.com/team.jpg" />
        <meta property="og:image:secure_url" content="https://www.jkcarmart.com/team.jpg" />        
        <meta property="og:image:width" content="1000" />
        <meta property="og:image:height" content="800" />
        <meta property="og:image:alt" content="JKCarMart" />

       
      </Head>   
      <LayoutBuy className="home_page"> 
      <CarsList />
      </LayoutBuy>       
    </>
  )
}


export async function getStaticProps(){
    
  const {data} = await store.dispatch(getLatestBlogPosts.initiate());
  await Promise.all(store.dispatch(getRunningQueriesThunk()));
 
  return{props:{data},revalidate: 60}
}
