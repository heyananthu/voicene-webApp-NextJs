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
        try {
            const res = await axios.delete(`/api/employees/${id}`);
            if (res.status === 200) {
                toast.success('Details Deleted...');
                setEmployers((prev) => prev.filter((emp) => emp._id !== id));
            }
        } catch (error) {
            console.error('Delete Error:', error);
        } finally {
            setDeletingId(null);
        }
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formDataToSubmit = new FormData();

        for (const [key, value] of Object.entries(formData)) {
            if (key === 'projects' || key === 'education' || key === 'experiences') {
                formDataToSubmit.append(key, JSON.stringify(value));
            } else if (Array.isArray(value)) {
                value.forEach(item => formDataToSubmit.append(key, item));
            } else {
                formDataToSubmit.append(key, value);
            }
        }
        if (photo) {
            formDataToSubmit.append('photo', photo);
        }

        try {
            const res = await axios.put(`/api/employees/${editingEmployer}`, formDataToSubmit, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (res.status === 200) {
                toast.success('Details Updated...', {
                    position: 'top-center',
                    theme: 'colored',
                    transition: Bounce,
                });
                setEmployers((prev) =>
                    prev.map((emp) => (emp._id === editingEmployer ? res.data.updatedEmployer : emp))
                );
                setEditingEmployer(null);
                setPhoto(null);
                setFormData({
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
            } else {
                toast.error('Failed to update details', {
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
        }
        finally {
            setIsSubmitting(false);
        }
    };



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
                                    <MdDelete size={25} />
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Resume Modal */}
            {selectedEmployer && (
                <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center text-gray-900 font-sans">
                    <div className="bg-white w-[95%] max-w-6xl p-6 lg:p-10 rounded-xl shadow-2xl overflow-y-auto max-h-[90vh] relative">

                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 text-5xl text-gray-500 hover:text-gray-700 transition-colors duration-200"
                            onClick={() => setSelectedEmployer(null)}
                        >
                            ×
                        </button>

                        {/* Header */}
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
                                    {selectedEmployer.email} | {selectedEmployer.contact}
                                </p>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="flex flex-col lg:flex-row gap-6 text-gray-700">

                            {/* Left Panel */}
                            <div className="flex-1 space-y-6">

                                {/* Personal Details */}
                                <Section title="👤 Personal Details">
                                    <Detail label="Total Experience" value={selectedEmployer.totalexperience} />
                                    <Detail label="Gender" value={selectedEmployer.gender} />
                                    <Detail label="Date of Birth" value={formatDateDDMMYYYY(selectedEmployer.dob)} />
                                    <Detail label="Nationality" value={selectedEmployer.nationality} />
                                    <Detail label="Languages" value={selectedEmployer.language} />
                                    <Detail label="Date of Joining" value={formatDateDDMMYYYY(selectedEmployer.doj)} />
                                </Section>

                                {/* Education */}
                                <Section title="🎓 Education">
                                    <ul className="space-y-4">
                                        {selectedEmployer.education?.map((edu, i) => (
                                            <li key={i} className="flex items-start gap-4">
                                                <span className="min-w-[30px] font-semibold">{i + 1}.</span>
                                                <div>
                                                    <p><b>School/College:</b> {edu.school}</p>
                                                    <p><b>Course:</b> {edu.course}</p>
                                                    <p><b>Year:</b> {edu.year}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </Section>

                                {/* Skills */}
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
                                        ))}
                                    </ol>
                                </Section>
                            </div>

                            {/* Right Panel */}
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
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </Section>

                                {/* Projects */}
                                <Section title="🚀 Projects">
                                    <ul className="space-y-6">
                                        {selectedEmployer.projects?.map((proj, i) => (
                                            <li key={i} className="flex items-start gap-4">
                                                <span className="min-w-[30px] font-semibold">{i + 1}.</span>
                                                <div className="space-y-1">
                                                    <p><b>Project Name:</b> {proj.projectName}</p>
                                                    <p><b>Client:</b> {proj.client}</p>
                                                    <p><b>Team Size:</b> {proj.teamSize}</p>
                                                    <p><b>Technology:</b> {proj.technology}</p>
                                                    <div>
                                                        <p className="font-semibold">Description:</p>
                                                        <ul className="list-disc ml-6 space-y-1">
                                                            {Array.isArray(proj.description) &&
                                                                proj.description.map((desc, idx) => (
                                                                    <li key={idx}>{desc}</li>
                                                                ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </Section>
                            </div>
                        </div>
                    </div>
                </div>
            )}


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
                                </div>
                            ))}

                            {/* Photo */}
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
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

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
