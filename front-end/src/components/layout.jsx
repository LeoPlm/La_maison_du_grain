import React from 'react'
import Header from './header'
import Footer from './footer'
import { Outlet, useLocation } from 'react-router-dom'

const Layout = () => {
    const location = useLocation()

    const pageWithBackGround = ['/', '/articlesview', '/profile', 'quisommesnous', '/cart', '/detail/:id', '/quisommesnous']

    const hasBackGround = pageWithBackGround.some(path => {
        if (path.includes(":")) {
            const regexPath = path.replace(":id", "[\\w-]+")
            const regex = new RegExp(`^${regexPath}$`)
            return regex.test(location.pathname)
        } else {
            return location.pathname === path
        }
    })

    return (
        // Ajout de la div root pour étirer le footer en bas de la page via le css
        <div 
            id="root"
            style={{
                backgroundImage: hasBackGround ? "url('/img/bg-cafe.jpg')" : "none",
                backgroundColor : hasBackGround ? "none" : "#F5F5DC",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                minHeight: "100vh"
            }}> 
                <Header/>
                    <main>
                        <Outlet/>
                    </main>
                <Footer/>
            </div>
    )
}

export default Layout
