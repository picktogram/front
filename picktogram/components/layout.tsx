import React from 'react'
import Footer from './footer'
import Header from './header'

export default function Layout(props : {children : React.ReactNode}) {


  return (
    <div>
      <main style={{marginTop : "150px" }}>{props.children}</main>
      <Footer />
    </div>
  )
}
