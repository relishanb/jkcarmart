import Head from 'next/head'
import { Inter } from '@next/font/google'
import BlogDetails from '@/components/Blogs/BlogDetails';
import Layout from '@/components/Layout/Layout';

import { useRouter } from 'next/router';



import store from '@/store';
import { getBlogPosts,getBlogPost,getRunningQueriesThunk } from '@/store/apiServices/apiServicesBlogs';

const inter = Inter({ subsets: ['latin'] });



export default function PageBlogDetails(props) {

const route = useRouter();

  return (
    <>
      <Head>
        <title>JKCarMart - Used Cars in Jammu and Kashmir-Buy,Sell,Compare</title>
        <meta name="description" content="Buy and Sell Used Cars in Jammu and Kashmir" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

       
        
      </Head>

     


      <Layout>
<BlogDetails singleBlog={props.data} slug={route.query.slug} />
</Layout>
  
      
    </>
  )
}

export async function getStaticPaths(){
  const {data} = await store.dispatch(getBlogPosts.initiate());
  const paths = data?.map(({slug})=>({
    params:{slug:slug},
  }))
  return {
    paths,
    fallback:true,
  }  
}

export async function getStaticProps(context){
    
  const {data} = await store.dispatch(getBlogPost.initiate(context.params.slug));


  await Promise.all(store.dispatch(getRunningQueriesThunk()));

 
  return{props:{data},revalidate: 60}
}
