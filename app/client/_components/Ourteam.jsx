"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Animatedcard from '@/components/ui/Animationcard'
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import defaultavatar from '@/public/assets/defaultavatar.png'

function Ourteam() {
    const [data, setData] = useState([]);
    const [hasMounted, setHasMounted] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);

    useEffect(() => {
        setHasMounted(true);
        axios.get("/api/employees").then((res) => {
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
                            className="cursor-pointer card bg-white w-80 h-80 shadow-md shadow-slate-300 hover:scale-105 transition-transform duration-200"
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
                            className="bg-white rounded-xl shadow-xl p-6 w-[95%] max-w-5xl overflow-y-auto max-h-[90vh] relative"
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

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Left Side - Profile Summary */}
                                <div className="md:col-span-1 flex flex-col items-center gap-4">
                                    <Image
                                        src={selectedMember.photo ? `/uploads/${selectedMember.photo}` : defaultavatar}
                                        alt={selectedMember.name}
                                        className="rounded-full w-32 h-32 object-cover"
                                        width={128}
                                        height={128}
                                    />
                                    <div className="text-center">
                                        <h2 className="text-xl font-bold text-gray-800">{selectedMember.name}</h2>
                                        <p className="text-sm text-gray-500">{selectedMember.position}</p>
                                    </div>
                                    <div className="text-left w-full text-sm text-gray-700">
                                        <h3 className="font-semibold mb-2 border-b pb-1">Personal Info</h3>
                                        <ul className="space-y-1">
                                            <li><strong>Gender:</strong> {selectedMember.gender}</li>
                                            <li><strong>DOB:</strong> {new Date(selectedMember.dob).toLocaleDateString()}</li>
                                            <li><strong>Nationality:</strong> {selectedMember.nationality}</li>
                                            <li><strong>Languages:</strong> {selectedMember.language}</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Right Side - Resume Content */}
                                <div className="md:col-span-2 space-y-6 text-sm text-gray-800">
                                    <ResumeSection title="Education" items={selectedMember.education} />
                                    <ResumeBadgeSectionSkills title="Skills" items={selectedMember.skills} />
                                    <ResumeBadgeSection title="Soft Skills" items={selectedMember.softskills} />
                                    <ResumeSection title="Experience" items={selectedMember.experiences} />
                                    <ResumeSection title="Projects" items={selectedMember.projects} />
                                    <ResumeSection title="Achievements" items={selectedMember.achievements} />
                                </div>
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
