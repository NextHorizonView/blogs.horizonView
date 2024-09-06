import { Gauge, Layers2, LayoutList, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Sidebar() {
  const links = [
    {
      name: 'Dashboard',
      link: '/admin',
      icon: <Gauge />,
    },
    {
      name: 'Post',
      link: '/admin/posts',
      icon: <LayoutList />,
    },
    {
      name: 'Categories',
      link: '/admin/categories',
      icon: <Layers2 />,
    },
    {
      name: 'Authors',
      link: '/admin/authors',
      icon: <User />,
    },
  ]

  return (
    <section className='w-[200px] border-r h-screen p-6 '>
      <ul className='w-full flex flex-col gap-6'>
        {links.map((item) => (
          <li key={item.name} className="flex items-center gap-3 font-bold bg-blue-50 rounded-full px-5 py-5">
            <Link href={item.link} className="flex items-center">
              {item.icon}
              <span className='text-black ml-2 font-bold'>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
