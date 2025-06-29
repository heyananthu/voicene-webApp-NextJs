"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import defaultavatar from '@/public/assets/defaultavatar.png';
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import Loading from '@/public/assets/Loading.json';
import Error from '@/public/assets/error.json';
import Nodataanim from '@/public/assets/nodataanim.json';
<<<<<<< HEAD
import { motion } from "framer-motion";
=======
>>>>>>> 74a634e42efaa1fa9d625c35472eb24ba2e7e00f

function EmployersList({ employers, setEmployers, loading, error }) {
    if (loading) return <div className="flex justify-center"><Lottie animationData={Loading} className='w-[45rem] h-[15rem]' /></div>;
    if (error) return <div className="flex justify-center"><Lottie animationData={Error} className='w-[45rem] h-[15rem]' /></div>;

    if (!employers || employers.length === 0) {
        return <div className="flex justify-center"><Lottie animationData={Nodataanim} className='w-[50rem] h-[20rem]' /></div>;
    }

    const [selectedEmployer, setSelectedEmployer] = useState(null);
    const [editingEmployer, setEditingEmployer] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: '', email: '', contact: '', position: '', totalexperience: '', gender: '', dob: '', doj: '', nationality: '', language: '',
        education: [{ school: '', course: '', year: '' }],
        skills: [''],
        softskills: [''],
        experiences: [{ company: '', jobRole: '', jobDescription: '' }],
        projects: [{
            projectName: '',
            client: '',
            teamSize: '',
            technology: '',
            description: ['']
        }],
        achievements: ['']
    });
    const [photo, setPhoto] = useState(null);

    const router = useRouter();

    useEffect(() => {
        const adminStatus = localStorage.getItem('admin');
        if (adminStatus !== 'authenticated') router.push('/my-admin');
    }, [router]);

    const handleDelete = async (id) => {
        setDeletingId(id);
<<<<<<< HEAD

        try {
            const res = await axios.delete(`/api/employees/${id}`);

            if (res.status === 200) {
                toast.success('Employer deleted successfully', {
                    position: 'top-center',
                    theme: 'colored',
                });

                // Remove from local state
                setEmployers((prev) => prev.filter((emp) => emp.id !== id));
            } else {
                toast.error('❌ Failed to delete employer');
            }
        } catch (error) {
            console.error('Delete Error:', error);

            toast.error(
                error?.response?.data?.message || 'Server error during deletion',
                {
                    position: 'top-center',
                    theme: 'colored',
                }
            );
=======
        try {
            const res = await axios.delete(`/api/employees/${id}`);
            if (res.status === 200) {
                toast.success('Details Deleted...');
                setEmployers((prev) => prev.filter((emp) => emp._id !== id));
            }
        } catch (error) {
            console.error('Delete Error:', error);
>>>>>>> 74a634e42efaa1fa9d625c35472eb24ba2e7e00f
        } finally {
            setDeletingId(null);
        }
    };

<<<<<<< HEAD

    const handleEdit = (employer) => {
        const transformedProjects = employer.projects.map((proj) => ({
            ...proj,
            description:
                typeof proj.description === 'string'
                    ? proj.description.split('|||').map(d => d.trim()).filter(Boolean)
                    : Array.isArray(proj.description)
                        ? proj.description
                        : [''],
        }));

        setFormData({
            name: employer.name || '',
            email: employer.email || '',
            contact: employer.contact || '',
            position: employer.position || '',
            totalexperience: employer.totalexperience || '',
            gender: employer.gender || '',
            dob: employer.dob ? employer.dob.split('T')[0] : '',
            doj: employer.doj ? employer.doj.split('T')[0] : '',
            nationality: employer.nationality || '',
            language: employer.language || '',
            education: employer.education?.length ? employer.education : [{ school: '', course: '', year: '' }],
            skills: employer.skills?.length ? employer.skills : [''],
            softskills: employer.softskills?.length ? employer.softskills : [''],
            achievements: employer.achievements?.length ? employer.achievements : [''],
            experiences: employer.experiences?.length ? employer.experiences : [{ company: '', jobRole: '', jobDescription: '' }],
            projects: transformedProjects.length
                ? transformedProjects
                : [{ projectName: '', client: '', teamSize: '', technology: '', description: [''] }],
        });

        setEditingEmployer(employer.id); // or employer._id if you use Mongo
    };


=======
    const handleEdit = (emp) => {
        setEditingEmployer(emp._id);

        const formatDate = (date) => {
            if (!date) return '';
            const d = new Date(date);
            return isNaN(d) ? '' : d.toISOString().split('T')[0];
        };

        setFormData({
            ...emp,
            dob: formatDate(emp.dob),
            doj: formatDate(emp.doj),
            education: Array.isArray(emp.education) && emp.education.length
                ? emp.education
                : [{ school: '', course: '', year: '' }],
            skills: Array.isArray(emp.skills) && emp.skills.length ? emp.skills : [''],
            softskills: Array.isArray(emp.softskills) && emp.softskills.length ? emp.softskills : [''],
            experiences: Array.isArray(emp.experiences) && emp.experiences.length
                ? emp.experiences
                : [{ company: '', jobRole: '', jobDescription: '' }],
            projects: Array.isArray(emp.projects) && emp.projects.length
                ? emp.projects.map(proj => ({
                    ...proj,
                    description: Array.isArray(proj.description) ? proj.description : ['']
                }))
                : [{
                    projectName: '',
                    client: '',
                    teamSize: '',
                    technology: '',
                    description: ['']
                }],
            achievements: Array.isArray(emp.achievements) && emp.achievements.length ? emp.achievements : [''],
        });
    };

>>>>>>> 74a634e42efaa1fa9d625c35472eb24ba2e7e00f
    // Education handlers
    const handleEducationChange = (index, field, value) => {
        setFormData(prev => {
            const updated = [...prev.education];
            updated[index][field] = value;
            return { ...prev, education: updated };
        });
    };
    const addEducationField = () => {
        setFormData(prev => ({
            ...prev,
            education: [...prev.education, { school: '', course: '', year: '' }]
        }));
    };
    const removeEducationField = (index) => {
        setFormData(prev => ({
            ...prev,
            education: prev.education.filter((_, i) => i !== index)
        }));
    };

    // Experience handlers
    const handleExperienceChange = (index, field, value) => {
        setFormData(prev => {
            const updated = [...prev.experiences];
            updated[index][field] = value;
            return { ...prev, experiences: updated };
        });
    };
    const addExperienceField = () => {
        setFormData(prev => ({
            ...prev,
            experiences: [...prev.experiences, { company: '', jobRole: '', jobDescription: '' }]
        }));
    };
    const removeExperienceField = (index) => {
        setFormData(prev => ({
            ...prev,
            experiences: prev.experiences.filter((_, i) => i !== index)
        }));
    };

    // Projects handlers
    const handleProjectFieldChange = (index, field, value) => {
        setFormData(prev => {
            const updated = [...prev.projects];
            updated[index][field] = value;
            return { ...prev, projects: updated };
        });
    };
    const addProjectField = () => {
        setFormData(prev => ({
            ...prev,
            projects: [
                ...prev.projects,
                {
                    projectName: '',
                    client: '',
                    teamSize: '',
                    technology: '',
                    description: ['']
                }
            ]
        }));
    };
    const removeProjectField = (index) => {
        const newProjects = [...formData.projects];
        newProjects.splice(index, 1);
        setFormData({ ...formData, projects: newProjects });
    };


    // Project description handlers
    const handleProjectDescriptionChange = (projectIndex, descIndex, value) => {
        setFormData(prev => {
            const updatedProjects = [...prev.projects];
            updatedProjects[projectIndex].description[descIndex] = value;
            return { ...prev, projects: updatedProjects };
        });
    };
    const addDescriptionPoint = (projectIndex) => {
        setFormData(prev => {
            const updatedProjects = [...prev.projects];
            updatedProjects[projectIndex].description.push('');
            return { ...prev, projects: updatedProjects };
        });
    };
    const removeDescriptionPoint = (projectIndex, descIndex) => {
        setFormData(prev => {
            const updatedProjects = [...prev.projects];
            updatedProjects[projectIndex].description.splice(descIndex, 1);
            return { ...prev, projects: updatedProjects };
        });
    };

    // Skills, softskills, achievements handlers
    const handleArrayChange = (field, index, value) => {
        setFormData(prev => {
            const updated = [...prev[field]];
            updated[index] = value;
            return { ...prev, [field]: updated };
        });
    };
    const addArrayField = (field) => {
        setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], '']
        }));
    };
    const removeArrayField = (field, index) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    function formatDateDDMMYYYY(date) {
        if (!date) return '';
        const d = new Date(date);
        if (isNaN(d)) return '';
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const handleFileChange = (e) => {
        setPhoto(e.target.files[0]);
    };
<<<<<<< HEAD
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formDataToSubmit = new FormData();

        const cleanedFormData = {
            ...formData,
            skills: formData.skills.map(item => item.trim()).filter(Boolean),
            softskills: formData.softskills.map(item => item.trim()).filter(Boolean),
            achievements: formData.achievements.map(item => item.trim()).filter(Boolean),
            education: formData.education.filter(e => e.school || e.course || e.year),
            experiences: formData.experiences.filter(e => e.company || e.jobRole || e.jobDescription),
            projects: formData.projects
                .filter(p => p.projectName || p.client || p.teamSize || p.technology || (Array.isArray(p.description) && p.description.some(d => d.trim())))
                .map(p => ({ ...p, description: p.description?.filter(d => d.trim()) })),
        };

        for (const [key, value] of Object.entries(cleanedFormData)) {
            if (['projects', 'education', 'experiences'].includes(key)) {
=======

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formDataToSubmit = new FormData();

        for (const [key, value] of Object.entries(formData)) {
            if (key === 'projects' || key === 'education' || key === 'experiences') {
>>>>>>> 74a634e42efaa1fa9d625c35472eb24ba2e7e00f
                formDataToSubmit.append(key, JSON.stringify(value));
            } else if (Array.isArray(value)) {
                value.forEach(item => formDataToSubmit.append(key, item));
            } else {
                formDataToSubmit.append(key, value);
            }
        }
<<<<<<< HEAD

=======
>>>>>>> 74a634e42efaa1fa9d625c35472eb24ba2e7e00f
        if (photo) {
            formDataToSubmit.append('photo', photo);
        }

        try {
            const res = await axios.put(`/api/employees/${editingEmployer}`, formDataToSubmit, {
<<<<<<< HEAD
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (res.status === 200 && res.data?.success && res.data?.updatedEmployer) {
                toast.success('Details Updated Successfully', {
=======
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (res.status === 200) {
                toast.success('Details Updated...', {
>>>>>>> 74a634e42efaa1fa9d625c35472eb24ba2e7e00f
                    position: 'top-center',
                    theme: 'colored',
                    transition: Bounce,
                });
<<<<<<< HEAD

                // Update full list
                setEmployers((prev) =>
                    prev.map((emp) =>
                        emp.id === editingEmployer || emp._id === editingEmployer
                            ? { ...emp, ...res.data.updatedEmployer }
                            : emp
                    )
                );

                // ✅ Update selectedEmployer so modal gets new data
                if (selectedEmployer && (selectedEmployer.id === editingEmployer || selectedEmployer._id === editingEmployer)) {
                    setSelectedEmployer((prev) => ({
                        ...prev,
                        ...res.data.updatedEmployer,
                    }));
                }

                // Reset
                setEditingEmployer(null);
                setPhoto(null);
                setFormData({
                    name: '', email: '', contact: '', position: '', totalexperience: '',
                    gender: '', dob: '', doj: '', nationality: '', language: '',
=======
                setEmployers((prev) =>
                    prev.map((emp) => (emp._id === editingEmployer ? res.data.updatedEmployer : emp))
                );
                setEditingEmployer(null);
                setPhoto(null);
                setFormData({
                    name: '', email: '', contact: '', position: '', totalexperience: '', gender: '', dob: '', doj: '', nationality: '', language: '',
>>>>>>> 74a634e42efaa1fa9d625c35472eb24ba2e7e00f
                    education: [{ school: '', course: '', year: '' }],
                    skills: [''],
                    softskills: [''],
                    experiences: [{ company: '', jobRole: '', jobDescription: '' }],
<<<<<<< HEAD
                    projects: [{ projectName: '', client: '', teamSize: '', technology: '', description: [''] }],
                    achievements: [''],
                });

                document.getElementById('edit_modal')?.close?.();
            } else {
                toast.error('Failed to update details ❌', {
=======
                    projects: [{
                        projectName: '',
                        client: '',
                        teamSize: '',
                        technology: '',
                        description: ['']
                    }],
                    achievements: ['']
                });
            } else {
                toast.error('Failed to update details', {
>>>>>>> 74a634e42efaa1fa9d625c35472eb24ba2e7e00f
                    position: 'top-center',
                    theme: 'colored',
                    transition: Bounce,
                });
            }
        } catch (error) {
            console.error('Update Error:', error);
            toast.error('An error occurred while updating', {
                position: 'top-center',
                theme: 'colored',
                transition: Bounce,
            });
<<<<<<< HEAD
        } finally {
=======
        }
        finally {
>>>>>>> 74a634e42efaa1fa9d625c35472eb24ba2e7e00f
            setIsSubmitting(false);
        }
    };

<<<<<<< HEAD
    const getInitial = (name) => {
        return name ? name.charAt(0).toUpperCase() : "?";
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
        }),
    };



    return (
        <div className="p-6 bg-white w-full h-fit">
            <div className="grid grid-cols-1  lg:grid-cols-3 gap-6">
                {employers?.map((emp, index) => (
                    <motion.div
                        key={emp?.id || `emp-${index}`}
                        custom={index}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        className="relative bg-white rounded-2xl shadow-md hover:shadow-xl p-4 sm:p-5 cursor-pointer transition-all duration-300 group overflow-hidden border border-gray-200 hover:border-blue-300 w-full max-w-md"
                        onClick={() => setSelectedEmployer(emp)}
                        whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)" }}
                    >
                        {/* Gradient Border Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" style={{ zIndex: -1 }} />

                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                                {emp?.photo ? (
                                    <Image
                                        src={`/uploads/${emp.photo}`}
                                        alt={`${emp?.name || 'Employee'}'s photo`}
                                        width={64}
                                        height={64}
                                        className="rounded-full object-cover"
                                    />
                                ) : (
                                    <span className="relative z-10">{getInitial(emp?.name)}</span>
                                )}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
                                    {emp?.name || 'No name provided'}
                                </h3>
                                <p className="text-sm text-gray-600 font-medium">
                                    {emp?.position || 'Position not available'}
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end gap-3">
                            <button
                                onClick={(e) => { e.stopPropagation(); handleEdit(emp); }}
                                className="text-green-600 hover:text-green-700 bg-green-100 p-2 rounded-full hover:bg-green-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                                aria-label="Edit employee"
                            >
                                <BiEdit size={20} />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); handleDelete(emp.id); }}
                                className="text-red-600 hover:text-red-700 bg-red-100 p-2 rounded-full hover:bg-red-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center justify-center"
                                disabled={deletingId === emp.id}
                                aria-label="Delete employee"
                            >
                                {deletingId === emp.id ? (
=======


    return (
        <div className="p-6 bg-white min-h-screen">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {employers?.map((emp) => (
                    <div key={emp?._id || emp?.name || emp?.position || Math.random()} className="bg-gray-100 shadow-md rounded-lg p-4 cursor-pointer hover:shadow-xl transition"
                        onClick={() => setSelectedEmployer(emp)}>
                        <div className="flex items-center gap-4">
                            <Image
                                src={emp?.photo ? `/uploads/${emp.photo}` : defaultavatar}
                                alt="photo"
                                width={60}
                                height={60}
                                className="rounded-full w-20 h-20"
                            />
                            <div>
                                <h3 className="text-lg font-semibold text-black">{emp?.name || 'No name provided'}</h3>
                                <p className="text-sm text-gray-600">{emp?.position || 'Position not available'}</p>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                            <button onClick={(e) => { e.stopPropagation(); handleEdit(emp); }} className="text-green-600 cursor-pointer"><BiEdit size={25} /></button>
                            <button
                                onClick={(e) => { e.stopPropagation(); handleDelete(emp?._id); }}
                                className="text-red-600 cursor-pointer flex items-center justify-center"
                                disabled={deletingId === emp._id}
                            >
                                {deletingId === emp._id ? (
>>>>>>> 74a634e42efaa1fa9d625c35472eb24ba2e7e00f
                                    <svg
                                        className="animate-spin h-5 w-5 text-red-600"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                        ></path>
                                    </svg>
                                ) : (
<<<<<<< HEAD
                                    <MdDelete size={20} />
                                )}
                            </button>
                        </div>
                    </motion.div>
=======
                                    <MdDelete size={25} />
                                )}
                            </button>
                        </div>
                    </div>
>>>>>>> 74a634e42efaa1fa9d625c35472eb24ba2e7e00f
                ))}
            </div>

            {/* Resume Modal */}
            {selectedEmployer && (
<<<<<<< HEAD
                <div className="fixed inset-0 bg-gray-900 bg-opacity-70 z-50 flex justify-center items-center text-gray-900 font-sans transition-opacity duration-300">
                    <div className="bg-white w-[95%] max-w-6xl p-6 sm:p-8 lg:p-12 rounded-2xl shadow-xl overflow-y-auto max-h-[90vh] relative transform transition-all duration-300 scale-100 hover:scale-[1.01]">

                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 text-4xl text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
=======
                <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center text-gray-900 font-sans">
                    <div className="bg-white w-[95%] max-w-6xl p-6 lg:p-10 rounded-xl shadow-2xl overflow-y-auto max-h-[90vh] relative">

                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 text-5xl text-gray-500 hover:text-gray-700 transition-colors duration-200"
>>>>>>> 74a634e42efaa1fa9d625c35472eb24ba2e7e00f
                            onClick={() => setSelectedEmployer(null)}
                        >
                            ×
                        </button>

                        {/* Header */}
<<<<<<< HEAD
                        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 pb-6 border-b border-gray-200">
                            <Image
                                src={selectedEmployer.photo ? `/uploads/${selectedEmployer.photo}` : defaultavatar}
                                alt="Profile photo"
                                width={120}
                                height={120}
                                className="rounded-full border-4 border-blue-100 shadow-md"
                            />
                            <div className="text-center sm:text-left">
                                <h2 className="text-3xl font-semibold text-gray-800 tracking-tight">{selectedEmployer.name}</h2>
                                <p className="text-xl text-blue-600 font-medium mt-1">{selectedEmployer.position}</p>
                                <p className="text-sm text-gray-500 mt-2">
=======
                        <div className="flex items-center gap-6 mb-8 border-b pb-6">
                            <Image
                                src={selectedEmployer.photo ? `/uploads/${selectedEmployer.photo}` : defaultavatar}
                                alt="Profile photo"
                                width={96}
                                height={96}
                                className="rounded-full border-2 border-gray-200"
                            />
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">{selectedEmployer.name}</h2>
                                <p className="text-lg text-gray-600">{selectedEmployer.position}</p>
                                <p className="text-sm text-gray-500 mt-1">
>>>>>>> 74a634e42efaa1fa9d625c35472eb24ba2e7e00f
                                    {selectedEmployer.email} | {selectedEmployer.contact}
                                </p>
                            </div>
                        </div>

                        {/* Body */}
<<<<<<< HEAD
                        <div className="flex flex-col lg:flex-row gap-8 text-gray-700">

                            {/* Left Panel */}
                            <div className="flex-1 space-y-8">

                                {/* Personal Details */}
                                <Section title="👤 Personal Details" className="bg-gray-50 p-6 rounded-lg shadow-sm">
=======
                        <div className="flex flex-col lg:flex-row gap-6 text-gray-700">

                            {/* Left Panel */}
                            <div className="flex-1 space-y-6">

                                {/* Personal Details */}
                                <Section title="👤 Personal Details">
>>>>>>> 74a634e42efaa1fa9d625c35472eb24ba2e7e00f
                                    <Detail label="Total Experience" value={selectedEmployer.totalexperience} />
                                    <Detail label="Gender" value={selectedEmployer.gender} />
                                    <Detail label="Date of Birth" value={formatDateDDMMYYYY(selectedEmployer.dob)} />
                                    <Detail label="Nationality" value={selectedEmployer.nationality} />
                                    <Detail label="Languages" value={selectedEmployer.language} />
                                    <Detail label="Date of Joining" value={formatDateDDMMYYYY(selectedEmployer.doj)} />
                                </Section>

                                {/* Education */}
<<<<<<< HEAD
                                <Section title="🎓 Education" className="bg-gray-50 p-6 rounded-lg shadow-sm">
                                    <ul className="space-y-5">
                                        {selectedEmployer.education?.map((edu, i) => (
                                            <li key={i} className="flex items-start gap-4 hover:bg-blue-50 p-2 rounded-md transition-colors duration-200">
                                                <span className="min-w-[30px] font-semibold text-blue-600">{i + 1}.</span>
                                                <div>
                                                    <p><b className="text-gray-800">School/College:</b> {edu.school}</p>
                                                    <p><b className="text-gray-800">Course:</b> {edu.course}</p>
                                                    <p><b className="text-gray-800">Year:</b> {edu.year}</p>
=======
                                <Section title="🎓 Education">
                                    <ul className="space-y-4">
                                        {selectedEmployer.education?.map((edu, i) => (
                                            <li key={i} className="flex items-start gap-4">
                                                <span className="min-w-[30px] font-semibold">{i + 1}.</span>
                                                <div>
                                                    <p><b>School/College:</b> {edu.school}</p>
                                                    <p><b>Course:</b> {edu.course}</p>
                                                    <p><b>Year:</b> {edu.year}</p>
>>>>>>> 74a634e42efaa1fa9d625c35472eb24ba2e7e00f
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </Section>

                                {/* Skills */}
<<<<<<< HEAD
                                <Section title="🛠️ Skills" className="bg-gray-50 p-6 rounded-lg shadow-sm">
                                    <div className="flex flex-wrap gap-2">
                                        {selectedEmployer.skills?.map((skill, i) => (
                                            <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </Section>

                                {/* Soft Skills */}
                                <Section title="💡 Soft Skills" className="bg-gray-50 p-6 rounded-lg shadow-sm">
                                    <div className="flex flex-wrap gap-2">
                                        {selectedEmployer.softskills?.map((skill, i) => (
                                            <span key={i} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </Section>

                                {/* Achievements */}
                                <Section title="🏆 Achievements" className="bg-gray-50 p-6 rounded-lg shadow-sm">
                                    <ol className="list-decimal ml-6 space-y-3 text-gray-700">
                                        {selectedEmployer.achievements?.map((a, i) => (
                                            <li key={i} className="hover:text-blue-600 transition-colors duration-200">{a}</li>
=======
                                <Section title="🛠️ Skills">
                                    <p>{selectedEmployer.skills?.join(', ')}</p>
                                </Section>

                                {/* Soft Skills */}
                                <Section title="💡 Soft Skills">
                                    <p>{selectedEmployer.softskills?.join(', ')}</p>
                                </Section>

                                {/* Achievements */}
                                <Section title="🏆 Achievements">
                                    <ol className="list-decimal ml-6 space-y-2">
                                        {selectedEmployer.achievements?.map((a, i) => (
                                            <li key={i}>{a}</li>
>>>>>>> 74a634e42efaa1fa9d625c35472eb24ba2e7e00f
                                        ))}
                                    </ol>
                                </Section>
                            </div>

                            {/* Right Panel */}
<<<<<<< HEAD
                            <div className="flex-1 space-y-8">

                                {/* Experience */}
                                <Section title="🏢 Experience" className="bg-gray-50 p-6 rounded-lg shadow-sm">
                                    <ul className="space-y-5">
                                        {selectedEmployer.experiences?.map((exp, i) => (
                                            <li key={i} className="flex items-start gap-4 hover:bg-blue-50 p-2 rounded-md transition-colors duration-200">
                                                <span className="min-w-[30px] font-semibold text-blue-600">{i + 1}.</span>
                                                <div>
                                                    <p><b className="text-gray-800">Company:</b> {exp.company}</p>
                                                    <p><b className="text-gray-800">Job Role:</b> {exp.jobRole}</p>
                                                    <p><b className="text-gray-800">Description:</b> {exp.jobDescription}</p>
=======
                            <div className="flex-1 space-y-6">

                                {/* Experience */}
                                <Section title="🏢 Experience">
                                    <ul className="space-y-4">
                                        {selectedEmployer.experiences?.map((exp, i) => (
                                            <li key={i} className="flex items-start gap-4">
                                                <span className="min-w-[30px] font-semibold">{i + 1}.</span>
                                                <div>
                                                    <p><b>Company:</b> {exp.company}</p>
                                                    <p><b>Job Role:</b> {exp.jobRole}</p>
                                                    <p><b>Description:</b> {exp.jobDescription}</p>
>>>>>>> 74a634e42efaa1fa9d625c35472eb24ba2e7e00f
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </Section>

                                {/* Projects */}
<<<<<<< HEAD
                                {/* Projects Section */}
                                <Section title="🚀 Projects" className="bg-gray-50 p-6 rounded-lg shadow-sm">
                                    <ul className="space-y-6">
                                        {selectedEmployer.projects?.map((proj, i) => (
                                            <li key={i} className="hover:bg-blue-50 p-2 rounded-md transition-colors duration-200">
                                                <div className="space-y-2">
=======
                                <Section title="🚀 Projects">
                                    <ul className="space-y-6">
                                        {selectedEmployer.projects?.map((proj, i) => (
                                            <li key={i} className="flex items-start gap-4">
                                                <span className="min-w-[30px] font-semibold">{i + 1}.</span>
                                                <div className="space-y-1">
>>>>>>> 74a634e42efaa1fa9d625c35472eb24ba2e7e00f
                                                    <p><b>Project Name:</b> {proj.projectName}</p>
                                                    <p><b>Client:</b> {proj.client}</p>
                                                    <p><b>Team Size:</b> {proj.teamSize}</p>
                                                    <p><b>Technology:</b> {proj.technology}</p>
                                                    <div>
<<<<<<< HEAD
                                                        <p className="font-semibold text-gray-800">Description:</p>
                                                        <ul className="list-disc ml-6 space-y-1 text-gray-700">
                                                            {(proj.description || "")
                                                                .split("|||")
                                                                .filter(d => d.trim() !== "")
                                                                .map((desc, idx) => (
                                                                    <li key={idx}>{desc.trim()}</li>
=======
                                                        <p className="font-semibold">Description:</p>
                                                        <ul className="list-disc ml-6 space-y-1">
                                                            {Array.isArray(proj.description) &&
                                                                proj.description.map((desc, idx) => (
                                                                    <li key={idx}>{desc}</li>
>>>>>>> 74a634e42efaa1fa9d625c35472eb24ba2e7e00f
                                                                ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </Section>
<<<<<<< HEAD

=======
>>>>>>> 74a634e42efaa1fa9d625c35472eb24ba2e7e00f
                            </div>
                        </div>
                    </div>
                </div>
            )}

<<<<<<< HEAD
            {/* Edit Employer Modal */}
            {editingEmployer && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-70 z-50 flex justify-center items-center transition-opacity duration-300">
                    <div className="bg-white w-[95%] max-w-3xl p-6 sm:p-8 lg:p-10 rounded-2xl shadow-xl overflow-y-auto max-h-[90vh] relative transform transition-all duration-300 scale-100 hover:scale-[1.01]">

                        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6 text-gray-800 tracking-tight">Edit Employer Details</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Static Fields */}
                            {[
                                { name: 'name', placeholder: 'Name' },
                                { name: 'email', placeholder: 'Email', type: 'email' },
                                { name: 'contact', placeholder: 'Contact Number' },
                                { name: 'position', placeholder: 'Position' },
                                { name: 'totalexperience', placeholder: 'Total Experience' },
                                { name: 'gender', placeholder: 'Gender' },
                                { name: 'nationality', placeholder: 'Nationality' },
                                { name: 'language', placeholder: 'Languages' }
                            ].map(({ name, placeholder, type = 'text' }) => (
                                <div key={name} className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-700 mb-1">{placeholder}</label>
                                    <input
                                        type={type}
                                        name={name}
                                        placeholder={placeholder}
                                        className="input input-bordered w-full bg-gray-100 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200"
                                        value={formData[name]}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            ))}

                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                <input
                                    type="date"
                                    name="dob"
                                    className="input input-bordered w-full bg-gray-100 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200"
                                    value={formData.dob}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">Date of Joining</label>
                                <input
                                    type="date"
                                    name="doj"
                                    className="input input-bordered w-full bg-gray-100 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200"
                                    value={formData.doj}
                                    onChange={handleInputChange}
                                />
                            </div>

                            {/* Education */}
                            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                                <label className="font-semibold text-gray-800 text-lg">Education</label>
                                {formData.education.map((edu, idx) => (
                                    <div key={idx} className="space-y-3 border border-gray-200 p-4 mb-3 rounded-md relative bg-white hover:bg-blue-50 transition-colors duration-200">
                                        {['school', 'course', 'year'].map(field => (
                                            <div key={field} className="flex flex-col">
                                                <label className="text-sm font-medium text-gray-700 mb-1">
                                                    {field === 'school' ? 'School/College' : field.charAt(0).toUpperCase() + field.slice(1)}
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder={field === 'school' ? 'School/College' : field.charAt(0).toUpperCase() + field.slice(1)}
                                                    className="input input-bordered bg-gray-100 text-gray-800 w-full rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    value={edu[field]}
                                                    onChange={e => handleEducationChange(idx, field, e.target.value)}
                                                />
                                            </div>
                                        ))}
                                        <button type="button" className="btn btn-error btn-sm mt-2 hover:bg-red-600 transition-colors duration-200" onClick={() => removeEducationField(idx)}>Remove</button>
                                    </div>
                                ))}
                                <button type="button" className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 mt-2" onClick={addEducationField}>+ Add Education</button>
                            </div>

                            {/* Experience */}
                            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                                <label className="font-semibold text-gray-800 text-lg">Experience</label>
                                {formData.experiences.map((exp, idx) => (
                                    <div key={idx} className="space-y-3 border border-gray-200 p-4 mb-3 rounded-md relative bg-white hover:bg-blue-50 transition-colors duration-200">
                                        <div className="flex flex-col">
                                            <label className="text-sm font-medium text-gray-700 mb-1">Company</label>
                                            <input type="text" placeholder="Company" className="input input-bordered w-full bg-gray-100 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                value={exp.company} onChange={e => handleExperienceChange(idx, 'company', e.target.value)} />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-sm font-medium text-gray-700 mb-1">Job Role</label>
                                            <input type="text" placeholder="Job Role" className="input input-bordered w-full bg-gray-100 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                value={exp.jobRole} onChange={e => handleExperienceChange(idx, 'jobRole', e.target.value)} />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-sm font-medium text-gray-700 mb-1">Job Description</label>
                                            <textarea placeholder="Job Description" className="textarea textarea-bordered w-full bg-gray-100 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                value={exp.jobDescription} onChange={e => handleExperienceChange(idx, 'jobDescription', e.target.value)} />
                                        </div>
                                        <button type="button" className="btn btn-error btn-sm mt-2 hover:bg-red-600 transition-colors duration-200" onClick={() => removeExperienceField(idx)}>Remove</button>
                                    </div>
                                ))}
                                <button type="button" className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 mt-2" onClick={addExperienceField}>+ Add Experience</button>
                            </div>

                            {/* Projects */}
                            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                                <label className="font-semibold text-gray-800 text-lg">Projects</label>
                                {formData.projects.map((proj, idx) => (
                                    <div key={idx} className="border border-gray-200 p-4 mb-3 rounded-md bg-white relative hover:bg-blue-50 transition-colors duration-200">
                                        <button type="button" className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors duration-200" onClick={() => removeProjectField(idx)}>Remove</button>

                                        {['projectName', 'client', 'teamSize', 'technology'].map(field => (
                                            <div key={field} className="flex flex-col mb-2">
                                                <label className="text-sm font-medium text-gray-700 mb-1">{field.replace(/([A-Z])/g, ' $1')}</label>
                                                <input
                                                    type={field === 'teamSize' ? 'number' : 'text'}
                                                    placeholder={field.replace(/([A-Z])/g, ' $1')}
                                                    className="input input-bordered w-full bg-gray-100 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    value={proj[field]}
                                                    onChange={e => handleProjectFieldChange(idx, field, e.target.value)}
                                                />
                                            </div>
                                        ))}

                                        <label className="text-sm font-medium text-gray-700 mb-1">Project Description (Points)</label>
                                        {Array.isArray(proj.description) && proj.description.map((desc, dIdx) => (
                                            <div key={dIdx} className="flex gap-2 mb-2">
                                                <textarea
                                                    className="textarea textarea-bordered w-full bg-gray-100 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    value={desc}
                                                    placeholder={`Point ${dIdx + 1}`}
                                                    onChange={e => handleProjectDescriptionChange(idx, dIdx, e.target.value)}
                                                />
                                                <button type="button" className="btn btn-error btn-sm hover:bg-red-600 transition-colors duration-200" onClick={() => removeDescriptionPoint(idx, dIdx)}>Remove</button>
                                            </div>
                                        ))}
                                        <button type="button" className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 mt-2" onClick={() => addDescriptionPoint(idx)}>+ Add Point</button>
                                    </div>
                                ))}
                                <button type="button" className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 mt-2" onClick={addProjectField}>+ Add Project</button>
                            </div>

                            {/* Skills, Softskills, Achievements */}
                            {['skills', 'softskills', 'achievements'].map(field => (
                                <div key={field} className="bg-gray-50 p-6 rounded-lg shadow-sm">
                                    <label className="font-semibold text-gray-800 text-lg capitalize">
                                        {field === 'achievements' ? 'My Accomplishments' : field}
                                    </label>
                                    {formData[field].map((item, idx) => (
                                        <div key={idx} className="flex gap-2 mb-2">
                                            {field === 'achievements' ? (
                                                <textarea className="textarea textarea-bordered w-full bg-gray-100 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    value={item} onChange={e => handleArrayChange(field, idx, e.target.value)} />
                                            ) : (
                                                <input type="text" className="input input-bordered w-full bg-gray-100 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    value={item} onChange={e => handleArrayChange(field, idx, e.target.value)} />
                                            )}
                                            <button type="button" className="btn btn-error btn-sm hover:bg-red-600 transition-colors duration-200" onClick={() => removeArrayField(field, idx)}>Remove</button>
                                        </div>
                                    ))}
                                    <button type="button" className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 mt-2" onClick={() => addArrayField(field)}>+ Add</button>
=======

            {/* Edit Modal */}
            {editingEmployer && (
                <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
                    <div className="bg-white w-[95%] max-w-2xl p-6 rounded-xl shadow-2xl overflow-y-auto max-h-[90vh] relative">

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Static Fields */}
                            <input type="text" name="name" placeholder="Name" className="input input-bordered w-full bg-slate-200 text-black"
                                value={formData.name} onChange={handleInputChange} />
                            <input type="email" name="email" placeholder="Email" className="input input-bordered w-full bg-slate-200 text-black"
                                value={formData.email} onChange={handleInputChange} />
                            <input type="text" name="contact" placeholder="Contact Number" className="input input-bordered w-full bg-slate-200 text-black"
                                value={formData.contact} onChange={handleInputChange} />
                            <input type="text" name="position" placeholder="Position" className="input input-bordered w-full bg-slate-200 text-black"
                                value={formData.position} onChange={handleInputChange} />
                            <input type="text" name="totalexperience" placeholder="Total Experience" className="input input-bordered w-full bg-slate-200 text-black"
                                value={formData.totalexperience} onChange={handleInputChange} />
                            <input type="text" name="gender" placeholder="Gender" className="input input-bordered w-full bg-slate-200 text-black"
                                value={formData.gender} onChange={handleInputChange} />
                            <label className='text-black'>Date of Birth</label>
                            <input type="date" name="dob" className="input input-bordered w-full bg-slate-200 text-black"
                                value={formData.dob} onChange={handleInputChange} />
                            <input type="text" name="nationality" placeholder="Nationality" className="input input-bordered w-full bg-slate-200 text-black"
                                value={formData.nationality} onChange={handleInputChange} />
                            <input type="text" name="language" placeholder="Languages" className="input input-bordered w-full bg-slate-200 text-black"
                                value={formData.language} onChange={handleInputChange} />
                            <label className='text-black'>Date of Joining</label>
                            <input type="date" name="doj" className="input input-bordered w-full bg-slate-200 text-black"
                                value={formData.doj} onChange={handleInputChange} />

                            {/* Education */}
                            <div>
                                <label className="font-semibold text-black">Education</label>
                                {formData.education.map((edu, idx) => (
                                    <div key={idx} className="space-y-2 border border-black p-3 mb-2 relative">
                                        <input type="text" placeholder="School/College" className="input input-bordered bg-slate-200 text-black w-full"
                                            value={edu.school} onChange={e => handleEducationChange(idx, 'school', e.target.value)} />
                                        <input type="text" placeholder="Course" className="input input-bordered bg-slate-200 text-black w-full"
                                            value={edu.course} onChange={e => handleEducationChange(idx, 'course', e.target.value)} />
                                        <input type="text" placeholder="Year" className="input input-bordered bg-slate-200 text-black w-full"
                                            value={edu.year} onChange={e => handleEducationChange(idx, 'year', e.target.value)} />
                                        <button type="button" className="btn btn-error btn-xs mt-1"
                                            onClick={() => removeEducationField(idx)}>Remove</button>
                                    </div>
                                ))}
                                <button type="button" className="btn btn-sm bg-purple-600 text-white ml-2"
                                    onClick={addEducationField}>+ Add Education</button>
                            </div>

                            {/* Experience */}
                            <div>
                                <label className="font-semibold text-black">Experience</label>
                                {formData.experiences.map((exp, idx) => (
                                    <div key={idx} className="space-y-2 border border-black p-3 mb-2 relative">
                                        <input type="text" placeholder="Company" className="input input-bordered w-full bg-slate-200 text-black"
                                            value={exp.company} onChange={e => handleExperienceChange(idx, 'company', e.target.value)} />
                                        <input type="text" placeholder="Job Role" className="input input-bordered w-full bg-slate-200 text-black"
                                            value={exp.jobRole} onChange={e => handleExperienceChange(idx, 'jobRole', e.target.value)} />
                                        <textarea placeholder="Job Description" className="input input-bordered w-full bg-slate-200 text-black"
                                            value={exp.jobDescription} onChange={e => handleExperienceChange(idx, 'jobDescription', e.target.value)} />
                                        <button type="button" className="btn btn-error btn-xs mt-1"
                                            onClick={() => removeExperienceField(idx)}>Remove</button>
                                    </div>
                                ))}
                                <button type="button" className="btn btn-sm bg-purple-600 text-white"
                                    onClick={addExperienceField}>+ Add Experience</button>
                            </div>

                            {/* Projects */}
                            <div>
                                <label className="font-semibold text-black">Projects</label>
                                {formData.projects.map((proj, idx) => (
                                    <div key={idx} className="border p-3 mb-3 rounded bg-slate-50 relative">
                                        {/* Remove Entire Project */}
                                        <button
                                            type="button"
                                            className="absolute top-2 right-2 bg-red-500 px-1 py-1 rounded-md cursor-pointer"
                                            onClick={() => removeProjectField(idx)}
                                        >
                                            Remove
                                        </button>

                                        <input
                                            type="text"
                                            placeholder="Project Name"
                                            className="input input-bordered w-full mb-1 bg-slate-200 text-black mt-8"
                                            value={proj.projectName}
                                            onChange={e => handleProjectFieldChange(idx, 'projectName', e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Client"
                                            className="input input-bordered w-full mb-1 bg-slate-200 text-black"
                                            value={proj.client}
                                            onChange={e => handleProjectFieldChange(idx, 'client', e.target.value)}
                                        />
                                        <input
                                            type="number"
                                            placeholder="Team Size"
                                            className="input input-bordered w-full mb-1 bg-slate-200 text-black"
                                            value={proj.teamSize}
                                            onChange={e => handleProjectFieldChange(idx, 'teamSize', e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Technology"
                                            className="input input-bordered w-full mb-1 bg-slate-200 text-black"
                                            value={proj.technology}
                                            onChange={e => handleProjectFieldChange(idx, 'technology', e.target.value)}
                                        />

                                        {/* Description Points */}
                                        <div>
                                            <label className="text-black">Project Description (Points)</label>
                                            {proj.description.map((desc, dIdx) => (
                                                <div key={dIdx} className="flex gap-2 mb-1">
                                                    <textarea
                                                        className="input input-bordered w-full bg-slate-200 text-black p-1"
                                                        value={desc}
                                                        placeholder={`Point ${dIdx + 1}`}
                                                        onChange={e => handleProjectDescriptionChange(idx, dIdx, e.target.value)}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="btn btn-error btn-xs"
                                                        onClick={() => removeDescriptionPoint(idx, dIdx)}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                className="btn btn-primary btn-sm"
                                                onClick={() => addDescriptionPoint(idx)}
                                            >
                                                + Add Point
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="btn btn-sm bg-purple-600 text-white"
                                    onClick={addProjectField}
                                >
                                    + Add Project
                                </button>
                            </div>


                            {/* Skills, Softskills, Achievements */}
                            {['skills', 'softskills', 'achievements'].map(field => (
                                <div key={field}>
                                    <label className="font-semibold capitalize text-black">
                                        {field === 'achievements' ? 'My Accomplishments' : field}
                                    </label>
                                    {formData[field].map((item, idx) => (
                                        <div key={idx} className="flex gap-2 mb-1">
                                            {field === 'achievements' ? (
                                                <textarea className="input input-bordered w-full bg-slate-200 text-black"
                                                    value={item} onChange={e => handleArrayChange(field, idx, e.target.value)} />
                                            ) : (
                                                <input type="text" className="input input-bordered w-full bg-slate-200 text-black"
                                                    value={item} onChange={e => handleArrayChange(field, idx, e.target.value)} />
                                            )}
                                            <button type="button" className="btn btn-error btn-xs"
                                                onClick={() => removeArrayField(field, idx)}>Remove</button>
                                        </div>
                                    ))}
                                    <button type="button" className="btn btn-sm bg-purple-600 text-white"
                                        onClick={() => addArrayField(field)}>+ Add</button>
>>>>>>> 74a634e42efaa1fa9d625c35472eb24ba2e7e00f
                                </div>
                            ))}

                            {/* Photo */}
<<<<<<< HEAD
                            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                                <label className="font-semibold text-gray-800 text-lg">Photo</label>
                                <input type="file" accept="image/*" className="file-input file-input-bordered w-full bg-gray-100 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    onChange={handleFileChange} />
                                {photo && (
                                    <div className="mt-3">
                                        <img src={URL.createObjectURL(photo)} alt="Preview" className="w-28 h-28 object-cover rounded-md border border-gray-200 shadow-sm" />
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 justify-center">
                                <button type="submit" className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-400" disabled={isSubmitting}>
                                    {isSubmitting ? 'Updating...' : 'Update'}
                                </button>
                                <button type="button" className="px-6 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-700 transition-colors duration-200" onClick={() => setEditingEmployer(null)}>
=======
                            <div>
                                <label className="font-semibold text-black">Photo</label>
                                <input type="file" accept="image/*" className="file-input file-input-bordered w-full bg-slate-200 text-black"
                                    onChange={handleFileChange} />
                            </div>

                            <div className="flex gap-2 justify-center">
                                <button type="submit" className="px-4 py-2 rounded-md bg-purple-600 text-white"
                                    disabled={isSubmitting}>
                                    {isSubmitting ? 'Updating...' : 'Update'}
                                </button>
                                <button type="button" className="px-4 py-2 rounded-md bg-gray-600 text-white"
                                    onClick={() => setEditingEmployer(null)}>
>>>>>>> 74a634e42efaa1fa9d625c35472eb24ba2e7e00f
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

<<<<<<< HEAD

=======
>>>>>>> 74a634e42efaa1fa9d625c35472eb24ba2e7e00f
        </div>
    );
}

function Section({ title, children }) {
    return (
        <div>
            <h4 className="font-bold mb-2">{title}</h4>
            <div className="space-y-1">{children}</div>
        </div>
    );
}
function Detail({ label, value }) {
    return value ? (
        <div>
            <span className="font-semibold">{label}:</span> {value}
        </div>
    ) : null;
}

export default EmployersList;
