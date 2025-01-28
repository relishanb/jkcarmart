import { Html, Head, Main, NextScript } from 'next/document'
import { ToastContainer } from 'react-toastify'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <link href="https://fonts.googleapis.com/css?family=Poppins:700,600,500,400,300&display=swap" rel="stylesheet"></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
