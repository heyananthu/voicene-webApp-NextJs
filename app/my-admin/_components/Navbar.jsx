"use client"

import React from 'react'
import logo from '@/public/assets/Logo_Balck.png'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from 'next/navigation'
import fav from '@/public/assets/fav.png'

function Navbar() {
    const router = useRouter();
    const logoutHandler = () => {
        localStorage.removeItem("admin")
        router.push('/my-admin')
    }
    return (
        <div className='w-full p-5 shadow-md rounded fixed top-0 left-0 z-10 bg-white'>
            <div className='flex justify-between items-center'>
                <Image src={logo} className='w-32 h-7 md:w-56 md:h-12' alt='logo' />
                <div className='flex items-center gap-3'>
                    <Avatar className="w-10 h-10 md:w-10 md:h-10">
                        <AvatarImage src={fav.src} />
                        <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    {/* <h1 className='font-semibold text-2xl'>Admin</h1> */}

                    <button className='bg-purple-600 text-white px-3 py-2  md:px-8 md:py-2 hover:scale-105 duration-500 rounded-md' onClick={logoutHandler}>Logout</button>
                </div>
            </div>


        </div>
    )
}

export default Navbar
