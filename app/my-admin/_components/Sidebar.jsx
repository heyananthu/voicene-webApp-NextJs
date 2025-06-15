"use client"

import React, { useState } from 'react';
import { MdDashboard, MdAccountCircle } from "react-icons/md";
import { GrTechnology } from "react-icons/gr";
import { GrUpgrade } from "react-icons/gr";
import { IoPerson } from "react-icons/io5";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3 } from "react-icons/hi";

const sidebarData = [
    { title: "Dashboard", icon: MdDashboard, path: '#' },
    { title: "Employees", icon: IoPerson, path: '/my-admin/dashboard/Employee' },
    { title: "Technologies", icon: GrTechnology, path: '#' },
    { title: "Account", icon: MdAccountCircle, path: '#' }
];

function Sidebar() {
    const path = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Mobile Toggle Button */}
            <div className="md:hidden absolute p-4  mt-20 text-black">
                <button onClick={toggleSidebar}>
                    <HiMenuAlt3 size={30} />
                </button>
            </div>

            {/* Sidebar for Desktop */}
            <div className="hidden md:block mt-20  w-64 p-4 shadow-md h-screen fixed bg-white z-40">
                <div className='grid gap-10 mt-4'>
                    {sidebarData.map((obj, index) => (
                        <Link href={obj.path} key={index}>
                            <div className={`text-black flex items-center gap-3 py-3 hover:bg-purple-600 hover:scale-105 duration-300 hover:text-white rounded-md px-2 ${path === obj.path && "bg-purple-600 text-white hover:scale-none"}`}>
                                <obj.icon size={28} />
                                <h1 className="text-xl">{obj.title}</h1>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Mobile Sidebar with Framer Motion */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-16 left-0 w-64 h-screen bg-white p-4 shadow-lg z-50 md:hidden"
                    >
                        <div className="flex justify-end mb-4">
                            <button onClick={toggleSidebar} className="text-2xl">✖</button>
                        </div>
                        <div className='grid gap-5'>
                            {sidebarData.map((obj, index) => (
                                <Link href={obj.path} key={index} onClick={() => setIsOpen(false)}>
                                    <div className={`text-black flex items-center gap-3 py-2 hover:bg-purple-600 hover:scale-105 duration-300 hover:text-white rounded-md px-2 ${path === obj.path && "bg-purple-600 text-white hover:scale-100"}`}>
                                        <obj.icon size={28} />
                                        <h1 className="text-xl">{obj.title}</h1>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default Sidebar;
