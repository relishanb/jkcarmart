import Head from 'next/head'
import { Inter } from '@next/font/google'
import SellCar from '@/components/Cars/SellCar/SellCar'

import LayoutSell from '@/components/Layout/LayoutSell'



const inter = Inter({ subsets: ['latin'] })



export default function PageSellCar() {


  return (
    <>
      <Head>
        <title>Sell Your Used Car in Jammu & Kashmir – Free, Easy, and Fast!</title>
        <meta name="description" content=" 
 	      Sell your used car in Jammu & Kashmir with ease! Connect with thousands of buyers on our free platform – no fees, no hidden charges. Upload your car now!" />
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
