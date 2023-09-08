import Head from 'next/head'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Kalenteri</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
          <p>Salli toiminalliset evästeet nähdäksesi kalenterin.</p>
      </main>
    </div>
  )
}
