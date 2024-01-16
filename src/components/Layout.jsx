import React from 'react'
import Header from './Header'
import Footer from './Footer'
// 헤더 레이아웃
export default function Layout({children}) {
  return (
    <div>     
        {/* 네비게이션 */}
        <Header />
        {children}
        <Footer />
    </div>
  )
}
