import React from 'react'
import CategoyFormContextProvider from './context/CategoryFormContext'

export default function layout({children}) {
  return <CategoyFormContextProvider>
    {children}
  </CategoyFormContextProvider>
}
