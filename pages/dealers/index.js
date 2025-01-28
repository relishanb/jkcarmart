import Head from 'next/head'

import { Inter } from '@next/font/google'

import CarDealer from "../../components/Cars/CarDealer/CarDealer";

import Layout from '@/components/Layout/Layout'



const inter = Inter({ subsets: ['latin'] })



export default function Dealers() {
  return (
    <>
      <Head>
        <title> 
        Trusted Used Car Dealers in Jammu & Kashmir | JKCarMart
        </title>
        <meta name="description" content="Dealers and buyers are waiting for your used car in Jammu & Kashmir! Sell easily on our free platform – no fees, no hidden charges. Upload today!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://www.jkcarmart.com/" />
      </Head>
      <Layout> 
      <section className="first_section">
        <div className="container">
        <CarDealer />
        </div>
      </section>
      </Layout>       
    </>
  )
}
