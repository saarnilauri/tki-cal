import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Kalenteri</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
      <iframe src="https://calendar.google.com/calendar/embed?height=500&wkst=2&bgcolor=%23f7f7f6&ctz=Europe%2FHelsinki&mode=AGENDA&showTitle=1&showNav=0&showPrint=0&showTabs=0&showCalendars=0&showTz=0&title=Tapahtumakalenteri&src=bnRjZnZmMjR2cGwwOWRndnBrcHRqYjRwcWNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23616161&amp;hl=fi" style={{borderWidth: 0}} width="485" height="500" frameborder="0" scrolling="no"></iframe>
      </main>
    </div>
  )
}
