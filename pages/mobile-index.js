

import Head from 'next/head'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Mobiili Kalenteri</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
      <iframe src="https://calendar.google.com/calendar/embed?height=370&wkst=2&bgcolor=%23f7f7f6&ctz=Europe%2FHelsinki&mode=AGENDA&showTitle=0&showNav=0&showPrint=0&showTabs=0&showCalendars=0&showTz=0&title=Tapahtumakalenteri&src=bnRjZnZmMjR2cGwwOWRndnBrcHRqYjRwcWNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23616161&amp;hl=fi" style={{borderWidth: 0}} width="280" height="370" frameborder="0" scrolling="no"></iframe>
      </main>
    </div>
  )
}
