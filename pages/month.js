


import Head from 'next/head'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Mobiili Kalenteri</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{backgroundColor:'#F5F3E3'}}>
      <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=2&bgcolor=%23F5F3E3&ctz=Europe%2FHelsinki&mode=MONTH&showTitle=0&showNav=1&showPrint=0&showTabs=0&showCalendars=0&showTz=0&title=Tapahtumakalenteri&src=bnRjZnZmMjR2cGwwOWRndnBrcHRqYjRwcWNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23616161&amp;hl=fi" style={{borderWidth: 0}} width="920" height="600"></iframe>
      </main>
    </div>
  )
}