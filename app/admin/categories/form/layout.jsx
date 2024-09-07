import React, { Suspense } from 'react'
import CategoyFormContextProvider from './context/CategoryFormContext'

export default function layout({children}) {
  return <CategoyFormContextProvider>
    <Suspense>
    {children}
    </Suspense>
  </CategoyFormContextProvider>
}