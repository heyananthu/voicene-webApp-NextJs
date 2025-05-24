"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Animatedcard from '@/components/ui/Animationcard'
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import defaultavatar from '@/public/assets/defaultavatar.png'
import dynamic from "next/dynamic";
import { BadgeCheck, Award, FolderKanban } from "lucide-react";

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
                            className="cursor-pointer bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl w-80 h-80 shadow-lg hover:shadow-xl transition duration-300 p-6 flex flex-col justify-center items-center hover:scale-105"
                        >
                            <div className="flex flex-col items-center text-center space-y-2">
                                <h2 className="text-xl font-semibold text-gray-800">{obj.name}</h2>
                                <p className="text-sm text-gray-500">{obj.position}</p>
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
                            className="bg-white rounded-2xl shadow-2xl p-6 md:p-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative font-sans"
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            {/* Close Button */}
                            <button
                                onClick={closeModal}
                                className="absolute top-3 right-4 text-gray-500 hover:text-black text-4xl font-light"
                            >
                                &times;
                            </button>

                            {/* Header */}
                            <div className="text-center mb-6 space-y-1">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{selectedMember.name}</h2>
                                <p className="text-base text-gray-600">{selectedMember.position}</p>
                                {selectedMember.totalexperience && (
                                    <p className="text-sm text-gray-500">
                                        Total Experience: {selectedMember.totalexperience}
                                    </p>
                                )}
                            </div>

                            {/* Resume Sections */}
                            <div className="space-y-8 text-sm text-gray-800">
                                {/* Technical Skills */}
                                {selectedMember.skills?.length > 0 && (
                                    <div>
                                        <SectionTitle icon={<BadgeCheck className="w-5 h-5 mr-2" />} title="Technical Skills" />
                                        <ul className="flex flex-wrap gap-2 mt-2">
                                            {selectedMember.skills.map((skill, i) => (
                                                <li key={i} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                                                    {skill}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Achievements */}
                                {selectedMember.achievements?.length > 0 && (
                                    <div>
                                        <SectionTitle icon={<Award className="w-5 h-5 mr-2" />} title="My Accomplishments" />
                                        <ul className="list-disc ml-6 mt-2 space-y-1">
                                            {selectedMember.achievements.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Projects */}
                                {selectedMember.projects?.length > 0 && (
                                    <div>
                                        <SectionTitle icon={<FolderKanban className="w-5 h-5 mr-2" />} title="Projects" />
                                        <div className="space-y-4 mt-2">
                                            {selectedMember.projects.map((proj, i) => (
                                                <div key={i} className="border p-4 rounded-xl shadow-sm bg-gray-50 space-y-1">
                                                    {/* Project Name with Serial No */}
                                                    {proj.projectName && (
                                                        <div className="font-semibold">
                                                            {i + 1}. {proj.projectName}
                                                        </div>
                                                    )}

                                                    {/* Client */}
                                                    {proj.client && (
                                                        <div className="text-sm mt-1">
                                                            <b>Client:</b> {proj.client}
                                                        </div>
                                                    )}

                                                    {/* Team Size */}
                                                    {proj.teamSize && (
                                                        <div className="text-sm">
                                                            <b>Team Size:</b> {proj.teamSize}
                                                        </div>
                                                    )}

                                                    {/* Technology */}
                                                    {proj.technology && (
                                                        <div className="text-sm">
                                                            <b>Technology:</b> {proj.technology}
                                                        </div>
                                                    )}

                                                    {/* Description */}
                                                    {proj.description && (
                                                        <div className="text-sm ">
                                                            <b>Description</b>
                                                            <ul className="list-disc ml-6 mt-1">
                                                                {Array.isArray(proj.description)
                                                                    ? proj.description.map((desc, idx) => (
                                                                        desc && <li key={idx}>{desc}</li>
                                                                    ))
                                                                    : <li>{proj.description}</li>
                                                                }
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

const ResumeProjectsSection = ({ title, items }) => {
    if (!items?.length) return null;
    return (
        <div>
            <h3 className="text-lg font-semibold border-b pb-1 mb-2">{title}</h3>
            <div className="space-y-4 mt-2">
                {items.map((project, index) => (
                    <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4 shadow-sm bg-gray-50 space-y-2"
                    >
                        <h4 className="text-xl font-bold text-gray-800">
                            {project.projectName}
                        </h4>
                        {project.client && (
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold">Client : </span> {project.client}
                            </p>
                        )}
                        {project.teamSize && (
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold">Team Size : </span> {project.teamSize}
                            </p>
                        )}
                        {project.technology && (
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold">Technology : </span> {project.technology}
                            </p>
                        )}
                        {Array.isArray(project.description) && project.description.length > 0 && (
                            <div className="text-sm text-gray-600 mt-1">
                                <span className="font-semibold">Description  </span>
                                <ul className="list-disc ml-6">
                                    {project.description.map((desc, idx) =>
                                        desc ? <li key={idx}>{desc}</li> : null
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

function SectionTitle({ icon, title }) {
    return (
        <div className="flex items-center text-lg font-semibold text-gray-800 border-b pb-1 mb-2">
            {icon}
            {title}
        </div>
    );
}
export default Ourteam;
