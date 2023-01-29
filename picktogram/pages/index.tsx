import Head from 'next/head'
import Layout from '@/components/layout'
import Card from '@/components/card'
import {useState} from "react"



export default function Home() {

  const dummyArray = new Array(100).fill(1)

  const [images, setImages] = useState<number[]>(dummyArray)

  const loggoutUser = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }


  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        hello world!
      </main>
      <div>
        <button onClick={loggoutUser}>logout</button>
      </div>
      <div style={{ margin : "0 auto", padding : "16px 20px", display : "grid", gridTemplateColumns : "1fr 1fr 1fr" , gap : '2rem'}}>
        {images.map((_, index) => <Card key={index} isLast={index === images.length - 1 } newLimit={()=> {
            setImages((prev) => [...prev, ...new Array(10).fill(1)])
            console.log('card end')}}/>
          )}
      </div>
    </Layout>
  )
}
