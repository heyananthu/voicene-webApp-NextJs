import React from 'react'
import Navbar from '@/app/my-admin/_components/Navbar'
import Sidebar from '@/app/my-admin/_components/Sidebar'
function layout({ children }) {
    return (
        <div className=''>
            <Navbar />
            <div className=''>
                <Sidebar />
                <main className='md:ml-64 p-3 md:p-5'>{children}</main>
            </div> 
        </div>
    )
}

export default layout

