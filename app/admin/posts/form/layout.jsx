import React, { Suspense } from 'react'
import PostsFormContextProvider from './context/PostsFormContext'

export default function layout({children}) {
  return <PostsFormContextProvider>
    <Suspense>
    {children}
    </Suspense>
  </PostsFormContextProvider>
}