import Head from 'next/head'
import { Inter } from '@next/font/google'
import Blogs from '@/components/Blogs/Blogs';
import Layout from '@/components/Layout/Layout';

import store from '@/store';
import { getBlogPosts,getRunningQueriesThunk } from '@/store/apiServices/apiServicesBlogs';



const inter = Inter({ subsets: ['latin'] });




export default function PageBlog(props) {

  return (
    <>
      <Head>
        <title>JKCarMart - Used Cars in Jammu and Kashmir-Buy,Sell,Compare</title>
        <meta name="description" content="Buy and Sell Used Cars in Jammu and Kashmir" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        

      </Head>



      <Layout>
<Blogs blogs={props.data}  />
</Layout>  
      
    </>
  )
}

export async function getStaticProps(){
    
  const {data} = await store.dispatch(getBlogPosts.initiate());
  await Promise.all(store.dispatch(getRunningQueriesThunk()));

 
  return{props:{data},revalidate: 60}
}
