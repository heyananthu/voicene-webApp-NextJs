"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Animatedcard from '@/components/ui/Animationcard'
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

function Ourteam() {
    const [data, setData] = useState([]);
    const [hasMounted, setHasMounted] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);

    useEffect(() => {
        setHasMounted(true);
        axios.get("/api/employees/[id]").then((res) => {
            setData(res.data.employers || []);
        });
    }, []);

    if (!hasMounted) return null;

    const handleCardClick = (member) => {
        setSelectedMember(member);
    };

    const closeModal = () => {
        setSelectedMember(null);
    };

    return (
        <div className="mb-12 px-4 flex flex-col items-center gap-8 max-w-screen-xl mx-auto p-4">
            <Animatedcard>
                <h1 className="text-center font-normal text-6xl mb-10 text-gray-600">Our Team</h1>
            </Animatedcard>

            <div className="flex flex-wrap justify-center gap-8">
                {data.map((obj, index) => (
                    <Animatedcard key={index} index={index}>
                        <div
                            onClick={() => handleCardClick(obj)}
                            className="cursor-pointer card bg-white w-80 h-80 shadow-md shadow-slate-300   hover:scale-105 transition-transform duration-200"
                        >
                            <figure className="px-6 pt-6">
                                <Image
                                    src={obj.photo ? `/uploads/${obj.photo}` : 'https://via.placeholder.com/150'}
                                    alt={obj.name}
                                    className="rounded-full w-32 h-32 object-cover"
                                    width={128}
                                    height={128}
                                />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="text-3xl font-semibold text-black">{obj.name}</h2>
                                <p className="text-gray-600 text-sm">{obj.position}</p>
                            </div>
                        </div>
                    </Animatedcard>
                ))}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedMember && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center "
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white rounded-xl shadow-xl shadow-slate-400 p-6 w-[90%] max-w-md relative"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            <button
                                onClick={closeModal}
                                className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl"
                            >
                                &times;
                            </button>
                            <div className="flex flex-col items-center space-y-4">
                                <Image
                                    src={selectedMember.photo ? `/uploads/${selectedMember.photo}` : 'https://via.placeholder.com/150'}
                                    alt={selectedMember.name}
                                    className="rounded-full w-32 h-32 object-cover"
                                    width={128}
                                    height={128}
                                />
                                <h2 className="text-2xl font-bold text-black">{selectedMember.name}</h2>
                                <p className="text-gray-600 font-medium text-lg">{selectedMember.position}</p>

                                {/* Experience */}
                                <div className="w-full text-left mt-4">
                                    <h3 className="text-gray-700 font-semibold">Experience:</h3>
                                    <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                                        {selectedMember.experiences.map((exp, index) => (
                                            <li key={index}>{exp}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Skills */}
                                <div className="w-full text-left mt-2">
                                    <h3 className="text-gray-700 font-semibold">Skills:</h3>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {selectedMember.skills.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Ourteam;
