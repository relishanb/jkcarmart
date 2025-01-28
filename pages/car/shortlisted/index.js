import Head from 'next/head'
import { Inter } from '@next/font/google'
import CarsShortlisted from '@/components/Cars/CarsShortlisted/CarsShortlisted'

import Layout from '@/components/Layout/Layout'


const inter = Inter({ subsets: ['latin'] })



export default function ShortlistedCars() {


  return (
    <>
      <Head>
        <title>JKCarMart - Used Cars in Jammu and Kashmir-Buy,Sell,Compare</title>
        <meta name="description" content="Buy and Sell Used Cars in Jammu and Kashmir" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        
        
      </Head>

     

      <Layout>  

  <CarsShortlisted />

  </Layout>
      
    </>
  )
}
