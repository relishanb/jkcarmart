import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import FakeLogin from "@/components/Login/FakeLogin";

import Layout from '@/components/Layout/Layout'

const inter = Inter({ subsets: ['latin'] })

export default function FakeLoginPage() {
  return (
    <>
      <Head>
        <title>JKCarMart - Used Cars in Jammu and Kashmir-Buy,Sell,Compare</title>
        <meta name="description" content="Buy and Sell Used Cars in Jammu and Kashmir" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout> 
      <section>
  <div className="container">
      <FakeLogin />
      </div>
</section>
</Layout>       
    </>
  )
}
