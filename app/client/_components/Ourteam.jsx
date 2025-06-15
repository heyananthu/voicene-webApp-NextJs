"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Animatedcard from '@/components/ui/Animationcard';
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import defaultavatar from '@/public/assets/defaultavatar.png';
import dynamic from "next/dynamic";
import { BadgeCheck, Award, FolderKanban } from "lucide-react";

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import Loading from '@/public/assets/Loading.json';

function OurTeam() {
    const [data, setData] = useState([]);
    const [hasMounted, setHasMounted] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [loading, setLoading] = useState(false);

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

    // Function to get the first letter of the name
    const getInitial = (name) => {
        return name ? name.charAt(0).toUpperCase() : "?";
    };

    // Card animation variants
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
        }),
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-12 max-w-screen-2xl mx-auto">
            <Animatedcard>
                <h1 className="text-center font-extrabold text-4xl sm:text-5xl lg:text-6xl mb-10 text-gray-900 tracking-tight">
                    Meet Our Team
                </h1>
            </Animatedcard>

            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-10">
                {data.map((obj, index) => (
                    <Animatedcard key={index} index={index}>
                        <motion.div
                            custom={index}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            onClick={() => handleCardClick(obj)}
                            className="cursor-pointer relative bg-white rounded-2xl w-72 sm:w-80 h-80  shadow-lg hover:shadow-2xl transition-all duration-500 p-6 flex flex-col items-center justify-center group overflow-hidden border border-gray-200 hover:border-blue-300"
                            whileHover={{ scale: 1.05, rotate: 1, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)" }}
                        >
                            {/* Gradient Border Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" style={{ zIndex: -1 }} />

                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white mb-4 relative overflow-hidden group-hover:scale-110 transition-transform duration-300">
                                {obj.photo ? (
                                    <Image
                                        src={`/uploads/${obj.photo}`}
                                        alt={`${obj.name}'s photo`}
                                        width={80}
                                        height={80}
                                        className="rounded-full object-cover"
                                    />
                                ) : (
                                    <span className="relative z-10">{getInitial(obj.name)}</span>
                                )}
                            </div>
                            <div className="flex flex-col items-center text-center space-y-2">
                                <h2 className="text-lg font-semibold text-gray-900">{obj.name}</h2>
                                <p className="text-sm text-gray-600 font-medium">{obj.position}</p>
                            </div>
                            <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="text-xs text-white font-medium">Click to view profile</span>
                            </div>
                        </motion.div>
                    </Animatedcard>
                ))}
                {loading && (
                    <div className="mt-8 flex items-center justify-center">
                        <Lottie animationData={Loading} style={{ height: 220, width: 220 }} />
                    </div>
                )}
            </div>

            {/* Resume Modal */}
            <AnimatePresence>
                {selectedMember && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 backdrop-blur-md p-4 sm:p-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <motion.div
                            className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative font-sans"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            {/* Close Button */}
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-3xl font-light focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full transition-colors duration-200"
                            >
                                ×
                            </button>

                            {/* Header */}
                            <div className="text-center mb-8 space-y-2">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white mx-auto mb-4">
                                    {selectedMember.photo ? (
                                        <Image
                                            src={`/uploads/${selectedMember.photo}`}
                                            alt={`${selectedMember.name}'s photo`}
                                            width={96}
                                            height={96}
                                            className="rounded-full object-cover"
                                        />
                                    ) : (
                                        <span className="relative z-10">{getInitial(selectedMember.name)}</span>
                                    )}
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
                                    {selectedMember.name}
                                </h2>
                                <p className="text-lg text-blue-600 font-medium">{selectedMember.position}</p>
                                {selectedMember.totalexperience && (
                                    <p className="text-sm text-gray-500">
                                        Total Experience: {selectedMember.totalexperience}
                                    </p>
                                )}
                            </div>

                            {/* Resume Sections */}
                            <div className="space-y-8 text-gray-700 text-sm">
                                {/* Technical Skills */}
                                {selectedMember.skills?.length > 0 && (
                                    <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
                                        <SectionTitle icon={<BadgeCheck className="w-5 h-5 mr-2 text-blue-600" />} title="Technical Skills" />
                                        <ul className="flex flex-wrap gap-2 mt-3">
                                            {selectedMember.skills.map((skill, i) => (
                                                <li key={i} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors duration-200">
                                                    {skill}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Achievements */}
                                {selectedMember.achievements?.length > 0 && (
                                    <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
                                        <SectionTitle icon={<Award className="w-5 h-5 mr-2 text-blue-600" />} title="My Accomplishments" />
                                        <ul className="list-disc ml-6 mt-3 space-y-2 text-gray-700">
                                            {selectedMember.achievements.map((item, i) => (
                                                <li key={i} className="hover:text-blue-600 transition-colors duration-200">{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Projects */}
                                {selectedMember.projects?.length > 0 && (
                                    <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
                                        <SectionTitle icon={<FolderKanban className="w-5 h-5 mr-2 text-blue-600" />} title="Projects" />
                                        <div className="space-y-4 mt-3">
                                            {selectedMember.projects.map((proj, i) => (
                                                <div
                                                    key={i}
                                                    className="border border-gray-200 p-4 rounded-xl bg-white hover:bg-blue-50 transition-colors duration-200"
                                                >
                                                    {/* Project Name */}
                                                    {proj.projectName && (
                                                        <div className="font-semibold text-gray-800">
                                                            {i + 1}. {proj.projectName}
                                                        </div>
                                                    )}

                                                    {proj.client && (
                                                        <div className="text-sm mt-1">
                                                            <b className="text-gray-800">Client:</b> {proj.client}
                                                        </div>
                                                    )}

                                                    {proj.teamSize && (
                                                        <div className="text-sm">
                                                            <b className="text-gray-800">Team Size:</b> {proj.teamSize}
                                                        </div>
                                                    )}

                                                    {proj.technology && (
                                                        <div className="text-sm">
                                                            <b className="text-gray-800">Technology:</b> {proj.technology}
                                                        </div>
                                                    )}

                                                    {proj.description && (
                                                        <div className="text-sm mt-2">
                                                            <b className="text-gray-800">Description:</b>
                                                            <ul className="list-disc ml-6 mt-1 space-y-1">
                                                                {Array.isArray(proj.description)
                                                                    ? proj.description.map((desc, idx) => (
                                                                        desc && <li key={idx}>{desc}</li>
                                                                    ))
                                                                    : proj.description
                                                                        .split("|||")
                                                                        .map((desc, idx) => desc.trim() && <li key={idx}>{desc.trim()}</li>)}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ========== Utility Components ==========

function SectionTitle({ icon, title }) {
    return (
        <div className="flex items-center text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-3">
            {icon}
            {title}
        </div>
    );
}

export default OurTeam;