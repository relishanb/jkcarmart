import Head from 'next/head'

import { Inter } from '@next/font/google'

import Terms from "../components/StaticPages/Terms";



const inter = Inter({ subsets: ['latin'] })



export default function TermsConditions() {
  return (
    <>
      <Head>
        <title>JKCarMart - Used Cars in Jammu and Kashmir-Buy,Sell,Compare</title>
        <meta name="description" content="Buy and Sell Used Cars in Jammu and Kashmir" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

       
        
      </Head>

      
      
<section className="first_section" style={{paddingBottom:"40px"}}>
  <div className="container">
  <Terms />
  </div>
</section>
     
    </>
  )
}
