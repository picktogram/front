import React, { ReactNode } from 'react'

export default function Layout({
    children
} : {
    children : ReactNode;
}) {
  return (
    <div>
        <header>헤더</header>
        <div>
            {children}
        </div>
    </div>
  )
}
