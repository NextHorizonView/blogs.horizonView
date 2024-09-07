import React from 'react'
import CountCard from './components/CountCard'
import { List, StickyNote, UserRound } from 'lucide-react'

export default function page() {
  return <main className='p-10'>
    {/* <h1>Admin Panel</h1> */}
    <div className='flex gap-4'>

    <CountCard  name={'Posts'} path={'posts'} icon={<StickyNote/>} />
    <CountCard  name={'Authors'} path={'authors'} icon={<UserRound/>} />
    <CountCard  name={'Categories'} path={'categories'} icon={<List/>} />

    </div>

  </main>
}
