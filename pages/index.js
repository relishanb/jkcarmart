import Head from 'next/head'
import { Inter } from '@next/font/google'
import Home from '@/components/Home/Home'
import HomePageBlogs from '@/components/Blogs/HomePageBlogs'

import Layout from '@/components/Layout/Layout'

import store from '@/store';
import { getLatestBlogPosts,getRunningQueriesThunk } from '@/store/apiServices/apiServicesBlogs';



const inter = Inter({ subsets: ['latin'] })



export default function HomePage(props) {
  return (
    <>
      <Head>
        <title>Buy &amp; Sell Used Cars in J&amp;K: Free platform exclusive to J&amp;K registered cars. Direct buyers &amp; sellers. No agents, no fees, or hidden costs!</title>
        <meta name="description" content="Buy or sell used cars in Jammu &amp; Kashmir quickly! Access our free platform with thousands of J&amp;K-only registered cars. No fees, no hidden charges, just trust. Start now!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

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

      



      <Layout className="home_page"> 
      <Home />
<section className="bg_blogs">
  <div className="container">
  <HomePageBlogs blogs={props.data} />
  </div>
</section>
</Layout>       
    </>
  )
}


export async function getStaticProps(){
    
  const {data} = await store.dispatch(getLatestBlogPosts.initiate());
  await Promise.all(store.dispatch(getRunningQueriesThunk()));
 
  return{props:{data},revalidate: 60}
}
