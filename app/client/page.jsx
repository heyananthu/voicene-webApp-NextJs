import React from 'react'
import Navbar from './_components/Navbar'
import Hero from './_components/Hero'
import Ourteam from './_components/Ourteam'
import FooterSection from './_components/FooterSection'
function page() {
    return (
        <div className='bg-white'>
            <Navbar />
            <Hero />
            <Ourteam />
            <FooterSection />

        </div>
    )
}

export default page
