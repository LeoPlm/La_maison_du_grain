import React from 'react'
import Header from './header'
import Footer from './footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <main>
            <Header/>
            <div>
                <Outlet/>
            </div>
            <Footer/>
        </main>
    )
}

export default Layout
