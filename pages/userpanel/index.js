import Head from 'next/head'
import { Inter } from '@next/font/google'
import Layout from '@/components/Layout/Layout'
import { useSelector } from 'react-redux'
import Account from '../mobile'

const inter = Inter({ subsets: ['latin'] })

export default function UserPanelPage() {
  const isLoggedIn = useSelector(state=>state.authentication.isLoggedIn);
  return (
    <>
      <Head>
        <title>JKCarMart - Used Cars in Jammu and Kashmir-Buy,Sell,Compare</title>
        <meta name="description" content="Buy and Sell Used Cars in Jammu and Kashmir" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />   
      </Head>
      <Layout activePage="userpanel">  
      {isLoggedIn && <Account/>}
      </Layout>
    </>
  )
}
