import { CirclePlus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import AuthorsListView from './components/AuthorsListView'

export default function page() {
  return <main className='p-6 w-full flex flex-col gap-6'>
    <div className='flex justify-between items-center'>
    <h1>Authors</h1>
    <Link href={'/admin/authors/form'}>
    <button className=' flex gap-2 items-center text-white bg-blue-500 px-4 py-4 rounded-full font-bold '> 
        <CirclePlus />
        Add
    </button>
    </Link>
    </div>
    <AuthorsListView />
  </main>
}
