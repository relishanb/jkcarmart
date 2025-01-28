import Head from 'next/head'

import { Inter } from '@next/font/google'

import FrequentlyAskedQuestions from "../components/StaticPages/FrequentlyAskedQuestions";

import Layout from '@/components/Layout/Layout'



const inter = Inter({ subsets: ['latin'] })



export default function Faq() {
  return (
    <>
      <Head>
        <title>JKCarMart - Frequently Asked Questions</title>
        <meta name="description" content="Buy and Sell Used Cars in Jammu and Kashmir" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        
        
      </Head>


      
      <Layout> 
      <FrequentlyAskedQuestions  />
</Layout>       
    </>
  )
}
