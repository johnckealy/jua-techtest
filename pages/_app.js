import '@/styles/globals.css'
import Head from 'next/head'


// Check the analytics is working, it isnt properly tested

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
