import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

function RootLayout() {
  return (
    <div className='content-container'>
        <Navbar/>
        {/* placeholder to load components dynamically */}
        <div className='container'>
            <Outlet/>
        </div>
        {/* <div className='footer-container'>
          <Footer/>
        </div> */}
    </div>
  )
}

export default RootLayout