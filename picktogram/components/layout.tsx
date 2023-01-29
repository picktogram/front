import React from 'react'
import Footer from './footer'
import Header from './header'

export default function Layout(props : {children : React.ReactNode}) {
  return (
    <div>
      <Header/>
      <div>{props.children}</div>
      <Footer />
    </div>
  )
}
