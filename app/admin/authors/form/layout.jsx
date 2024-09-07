import React, { Suspense } from 'react'
import AuthorFormContextProvider from './context/AuthorFormContext'

export default function layout({children}) {
  return <AuthorFormContextProvider>
    <Suspense>
    {children}
    </Suspense>
  </AuthorFormContextProvider>
}