import Head from 'next/head'
import { Inter } from '@next/font/google'
import SellCar from '@/components/Cars/SellCar/SellCar'

import LayoutSell from '@/components/Layout/LayoutSell'



const inter = Inter({ subsets: ['latin'] })



export default function PageSellCar() {


  return (
    <>
      <Head>
        <title>Sell Your Used Car in Jammu & Kashmir – Free, Easy, and Fast</title>
        <meta name="description" content=" 
 	      Get the best price for your used car in Jammu and kashmir with JKCarMart. Sell directly to buyers with no agents or hidden fees." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://www.jkcarmart.com/" />
       

      </Head>

  

      <LayoutSell>  

  <SellCar  />

  </LayoutSell>
      
    </>
  )
}
