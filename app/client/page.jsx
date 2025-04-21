import React from 'react'
import Navbar from './_components/Navbar'
import Hero from './_components/Hero'
import Ourteam from './_components/Ourteam'
import Footer from './_components/Footer'
function page() {
    return (
        <div className='bg-white'>
            <Navbar />
            <Hero />
            <Ourteam />
            <Footer />

        </div>
    )
}

export default page
