"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Animatedcard from '@/components/ui/Animationcard'
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import defaultavatar from '@/public/assets/defaultavatar.png'
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import Loading from '@/public/assets/Loading.json'
function Ourteam() {
    const [data, setData] = useState([]);
    const [hasMounted, setHasMounted] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true);
        setHasMounted(true);
        axios.get("/api/employees")
            .then((res) => {
                setData(res.data.employers || []);
            })
            .finally(() => {
                setLoading(false);
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
                <h1 className="text-center font-semibold  text-6xl mb-10 text-gray-600">Our Team</h1>
            </Animatedcard>

            <div className="flex flex-wrap justify-center gap-8 h-auto">
                {data.map((obj, index) => (
                    <Animatedcard key={index} index={index}>
                        <div
                            onClick={() => handleCardClick(obj)}
                            className="cursor-pointer card bg-white w-80 h-80 shadow-md shadow-slate-300 hover:scale-110 transition-transform duration-500"
                        >
                            <figure className="px-6 pt-6">
                                <Image
                                    src={obj.photo ? `/uploads/${obj.photo}` : defaultavatar}
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
                {loading && (
                    <div className="mt-4 flex items-center justify-center">
                        <Lottie animationData={Loading} style={{ height: 150, width: 150 }} />
                    </div>
                )}
            </div>

            {/* Resume Modal */}
            <AnimatePresence>
                {selectedMember && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative font-serif"
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            <button
                                onClick={closeModal}
                                className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl"
                            >
                                &times;
                            </button>

                            {/* Header */}
                            <div className="text-center mb-6">
                                <h2 className="text-3xl font-bold text-gray-900">{selectedMember.name}</h2>
                                <p className="text-sm text-gray-600">{selectedMember.position}</p>
                            </div>

                            {/* Resume Body */}
                            <div className="space-y-6 text-sm text-gray-800">
                                <ResumeSection title="Education" items={selectedMember.education} />
                                <ResumeSection title="Experience" items={selectedMember.experiences} />
                                <ResumeSection title="Projects" items={selectedMember.projects} />
                                <ResumeSection title="Achievements" items={selectedMember.achievements} />
                                <ResumeBadgeSection title="Soft Skills" items={selectedMember.softskills} />
                                <ResumeBadgeSectionSkills title="Technical Skills" items={selectedMember.skills} />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>


        </div>
    );
}

// Utility Components
const ResumeSection = ({ title, items }) => {
    if (!items?.length) return null;
    return (
        <div>
            <h3 className="text-lg font-semibold border-b pb-1 mb-2">{title}</h3>
            <ul className="list-disc list-inside space-y-1 pl-4">
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

const ResumeBadgeSection = ({ title, items }) => {
    if (!items?.length) return null;
    return (
        <div>
            <h3 className="text-lg font-semibold border-b pb-1 mb-2">{title}</h3>
            <div className="flex flex-wrap gap-2">
                {items.map((item, index) => (
                    <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                    >
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
};

const ResumeBadgeSectionSkills = ({ title, items }) => {
    if (!items?.length) return null;
    return (
        <div>
            <h3 className="text-lg font-semibold border-b pb-1 mb-2">{title}</h3>
            <div className="flex flex-wrap gap-2">
                {items.map((item, index) => (
                    <span
                        key={index}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium"
                    >
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Ourteam;
