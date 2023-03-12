import React from 'react'
import Footer from './footer'
import Header from '../main/components/header'

export default function Layout(props : {children : React.ReactNode}) {


  return (
    <div>
      <main>{props.children}</main>
    </div>
  )
}
