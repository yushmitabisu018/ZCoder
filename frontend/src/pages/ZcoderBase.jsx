import React from 'react'
import Header from '../components/Routes/Header'
import Footer from '../components/LandingPage/Footer'
import { Outlet } from 'react-router-dom'
import './ZcoderBase.css'  

const ZcoderBase = () => {
  return (
    <div className="zcoder-base-container">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default ZcoderBase
