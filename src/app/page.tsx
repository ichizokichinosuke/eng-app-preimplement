import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Test app</h1>
      <Link className='rounded bg-black text-white'  href='/investigate'>microphone test</Link>
    </main>
  )
}
