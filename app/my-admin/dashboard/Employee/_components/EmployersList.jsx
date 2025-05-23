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

function EmployersList({ employers, setEmployers }) {
    if (!employers || employers.length === 0) {
        return <p className="text-center text-gray-500">No employers found.</p>;
    }

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [selectedEmployer, setSelectedEmployer] = useState(null);
    const [editingEmployer, setEditingEmployer] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Projects is now an array of objects
    const [formData, setFormData] = useState({
        name: '', email: '', contact: '', position: '', totalexperience: '', gender: '', dob: '', doj: '', nationality: '', language: '',
        education: [''], skills: [''], softskills: [''], experiences: [''], projects: [{
            projectName: '',
            client: '',
            teamSize: '',
            technology: '',
            description: ''
        }], achievements: ['']
    });
    const [photo, setPhoto] = useState(null); // state for file input

    const router = useRouter();

    useEffect(() => {
        const adminStatus = localStorage.getItem('admin');
        if (adminStatus !== 'authenticated') router.push('/my-admin');
    }, [router]);

    // useEffect(() => {
    //     setLoading(true);
    //     const fetchEmployers = async () => {
    //         try {
    //             const res = await axios.get('/api/employees');
    //             if (res.status === 200) setEmployers(res.data.employers);
    //         } catch (error) {
    //             setError(true);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchEmployers();
    // }, []);

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
            education: emp.education && emp.education.length ? emp.education : [''],
            skills: emp.skills && emp.skills.length ? emp.skills : [''],
            softskills: emp.softskills && emp.softskills.length ? emp.softskills : [''],
            experiences: emp.experiences && emp.experiences.length ? emp.experiences : [''],
            projects:
                Array.isArray(emp.projects) && typeof emp.projects[0] === 'object'
                    ? emp.projects
                    : [{
                        projectName: '',
                        client: '',
                        teamSize: '',
                        technology: '',
                        description: ''
                    }],
            achievements: emp.achievements && emp.achievements.length ? emp.achievements : [''],
        });
    };

    // For project subfields
    const handleProjectFieldChange = (index, field, value) => {
        setFormData((prev) => {
            const updatedProjects = [...prev.projects];
            updatedProjects[index][field] = value;
            return { ...prev, projects: updatedProjects };
        });
    };

    const addProjectField = () => {
        setFormData((prev) => ({
            ...prev,
            projects: [
                ...prev.projects,
                {
                    projectName: '',
                    client: '',
                    teamSize: '',
                    technology: '',
                    description: ''
                }
            ]
        }));
    };

    const removeProjectField = (index) => {
        setFormData((prev) => ({
            ...prev,
            projects: prev.projects.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formDataToSubmit = new FormData();

        // Loop through formData object and append each field to FormData
        for (const [key, value] of Object.entries(formData)) {
            if (key === 'projects') {
                // Serialize projects as JSON string
                formDataToSubmit.append('projects', JSON.stringify(value));
            } else if (Array.isArray(value)) {
                if (value.length === 0) {
                    formDataToSubmit.append(key, '');
                } else {
                    value.forEach((item) => {
                        formDataToSubmit.append(key, item.trim());
                    });
                }
            } else {
                formDataToSubmit.append(key, typeof value === 'string' ? value.trim() : value);
            }
        }

        // Append photo if it exists
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

                // Update the employers list with the updated employer details
                setEmployers((prev) =>
                    prev.map((emp) => (emp._id === editingEmployer ? res.data.updatedEmployer : emp))
                );

                // Reset the editing state
                setEditingEmployer(null);
                setPhoto(null);

                // Optionally, reset form data
                setFormData({
                    name: '',
                    email: '',
                    contact: '',
                    experiences: [''],
                    position: '',
                    totalexperience: '',
                    skills: [''],
                    projects: [{
                        projectName: '',
                        client: '',
                        teamSize: '',
                        technology: '',
                        description: ''
                    }],
                    softskills: [''],
                    education: [''],
                    achievements: [''],
                    gender: '',
                    nationality: '',
                    dob: '',
                    doj: '',
                    language: '',
                    photo: null,
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleArrayChange = (e, field) => {
        const { value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [field]: value.split(',').map(item => item.trim()).filter(item => item !== ''),
        }));
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

    if (loading) return <div className="flex justify-center"><Lottie animationData={Loading} className='w-[45rem] h-[15rem]' /></div>;
    if (error) return <div className="flex justify-center"><Lottie animationData={Error} className='w-[45rem] h-[15rem]' /></div>;

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

                        {/* Header Section */}
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

                        {/* Resume Content: Two-column layout with scrollable flow */}
                        <div className="flex flex-col lg:flex-row gap-6 text-gray-700">

                            {/* Left Side Sections */}
                            <div className="flex-1 space-y-6">

                                <Section title="Personal Details">
                                    <Detail label="Total Experience" value={selectedEmployer.totalexperience} />
                                    <Detail label="Gender" value={selectedEmployer.gender} />
                                    <Detail label="Date of Birth" value={formatDateDDMMYYYY(selectedEmployer.dob)} />
                                    <Detail label="Nationality" value={selectedEmployer.nationality} />
                                    <Detail label="Languages" value={selectedEmployer.language} />
                                    <Detail label="Date of Joining" value={formatDateDDMMYYYY(selectedEmployer.doj)} />
                                </Section>

                                <Section title="Education">
                                    <ul className="list-disc pl-5 text-sm space-y-1">
                                        {Array.isArray(selectedEmployer.education) && selectedEmployer.education.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </Section>

                                <Section title="Skills">
                                    <ul className="list-disc pl-5 text-sm space-y-1">
                                        {Array.isArray(selectedEmployer.skills) && selectedEmployer.skills.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </Section>

                                <Section title="Soft Skills">
                                    <ul className="list-disc pl-5 text-sm space-y-1">
                                        {Array.isArray(selectedEmployer.softskills) && selectedEmployer.softskills.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </Section>

                                <Section title="My Accomplishments">
                                    <ul className="list-disc pl-5 text-sm space-y-1">
                                        {Array.isArray(selectedEmployer.achievements) && selectedEmployer.achievements.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </Section>

                            </div>

                            {/* Right Side Sections */}
                            <div className="flex-1 space-y-6">

                                <Section title="Experience">
                                    <ul className="list-disc pl-5 text-sm space-y-1">
                                        {Array.isArray(selectedEmployer.experiences) && selectedEmployer.experiences.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </Section>

                                <Section title="Projects">
                                    <ul className="space-y-4 text-sm">
                                        {Array.isArray(selectedEmployer.projects) && selectedEmployer.projects.map((project, index) => (
                                            <li key={index} className="border-l-2 border-blue-300 pl-4">
                                                <p><strong>Name:</strong> {project.projectName}</p>
                                                <p><strong>Client:</strong> {project.client}</p>
                                                <p><strong>Team Size:</strong> {project.teamSize}</p>
                                                <p><strong>Technology:</strong> {project.technology}</p>
                                                <p><strong>Description:</strong> {project.description}</p>
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
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center text-black">
                    <div className="bg-white w-[90%] max-w-2xl p-6 rounded-lg overflow-y-auto max-h-[90vh] relative">
                        <button className="absolute top-2 right-2 text-5xl font-normal cursor-pointer" onClick={() => setEditingEmployer(null)}>×</button>
                        <h2 className="text-xl font-bold mb-4">Edit Employer</h2>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <input type="text" name="name" placeholder="Name" className="input input-bordered w-full bg-slate-200" value={formData.name} onChange={handleInputChange} required />
                            <input type="text" name="position" placeholder="Position" className="input input-bordered w-full bg-slate-200 " value={formData.position} onChange={handleInputChange} />
                            <input type="email" name="email" placeholder="Email" className="input input-bordered w-full bg-slate-200" value={formData.email} onChange={handleInputChange} />
                            <input type="text" name="contact" placeholder="Contact Number" className="input input-bordered w-full bg-slate-200" value={formData.contact} onChange={handleInputChange} />
                            <input type="text" name="gender" placeholder="Gender" className="input input-bordered w-full bg-slate-200" value={formData.gender} onChange={handleInputChange} />
                            <label>Date of Birth</label>
                            <input type="date" name="dob" className="input input-bordered w-full bg-slate-200" value={formData.dob} onChange={handleInputChange} />
                            <input type="text" name="nationality" placeholder="Nationality" className="input input-bordered w-full bg-slate-200" value={formData.nationality} onChange={handleInputChange} />
                            <input type="text" name="language" placeholder="Language Proficiency" className="input input-bordered w-full bg-slate-200" value={formData.language} onChange={handleInputChange} />
                            <label>Date of Join</label>
                            <input type="date" name="doj" className="input input-bordered w-full bg-slate-200" value={formData.doj} onChange={handleInputChange} />
                            <input type="text" name="totalexperience" placeholder="Total Experience" className="input input-bordered w-full bg-slate-200" value={formData.totalexperience} onChange={handleInputChange} />

                            {/* Dynamic Array Fields */}
                            {/* Education */}
                            <div>
                                <label className="font-semibold">Education</label>
                                {formData.education.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-2 mb-1">
                                        <input
                                            type="text"
                                            className="input input-bordered w-full bg-slate-200"
                                            value={item}
                                            onChange={e => {
                                                const updated = [...formData.education];
                                                updated[idx] = e.target.value;
                                                setFormData(prev => ({ ...prev, education: updated }));
                                            }}
                                        />
                                        {formData.education.length > 1 && (
                                            <button
                                                type="button"
                                                className="btn btn-xs bg-red-600 text-white"
                                                onClick={() => setFormData(prev => ({
                                                    ...prev,
                                                    education: prev.education.filter((_, i) => i !== idx)
                                                }))}
                                            >Remove</button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="btn btn-sm mt-1 bg-purple-600 text-white"
                                    onClick={() =>
                                        setFormData(prev => ({
                                            ...prev,
                                            education: [...prev.education, ""]
                                        }))
                                    }
                                >
                                    + Add Education
                                </button>
                            </div>

                            {/* Skills */}
                            <div>
                                <label className="font-semibold">Skills</label>
                                {formData.skills.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-2 mb-1">
                                        <input
                                            type="text"
                                            className="input input-bordered w-full bg-slate-200"
                                            value={item}
                                            onChange={e => {
                                                const updated = [...formData.skills];
                                                updated[idx] = e.target.value;
                                                setFormData(prev => ({ ...prev, skills: updated }));
                                            }}
                                        />
                                        {formData.skills.length > 1 && (
                                            <button
                                                type="button"
                                                className="btn btn-xs bg-red-600 text-white"
                                                onClick={() => setFormData(prev => ({
                                                    ...prev,
                                                    skills: prev.skills.filter((_, i) => i !== idx)
                                                }))}
                                            >Remove</button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="btn btn-sm mt-1 bg-purple-600 text-white"
                                    onClick={() =>
                                        setFormData(prev => ({
                                            ...prev,
                                            skills: [...prev.skills, ""]
                                        }))
                                    }
                                >
                                    + Add Skill
                                </button>
                            </div>

                            {/* Soft Skills */}
                            <div>
                                <label className="font-semibold">Soft Skills</label>
                                {formData.softskills.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-2 mb-1">
                                        <input
                                            type="text"
                                            className="input input-bordered w-full bg-slate-200"
                                            value={item}
                                            onChange={e => {
                                                const updated = [...formData.softskills];
                                                updated[idx] = e.target.value;
                                                setFormData(prev => ({ ...prev, softskills: updated }));
                                            }}
                                        />
                                        {formData.softskills.length > 1 && (
                                            <button
                                                type="button"
                                                className="btn btn-xs bg-red-600 text-white"
                                                onClick={() => setFormData(prev => ({
                                                    ...prev,
                                                    softskills: prev.softskills.filter((_, i) => i !== idx)
                                                }))}
                                            >Remove</button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="btn btn-sm mt-1 bg-purple-600 text-white"
                                    onClick={() =>
                                        setFormData(prev => ({
                                            ...prev,
                                            softskills: [...prev.softskills, ""]
                                        }))
                                    }
                                >
                                    + Add Soft Skill
                                </button>
                            </div>

                            {/* Experiences */}
                            <div>
                                <label className="font-semibold">Experiences</label>
                                {formData.experiences.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-2 mb-1">
                                        <input
                                            type="text"
                                            className="input input-bordered w-full bg-slate-200"
                                            value={item}
                                            onChange={e => {
                                                const updated = [...formData.experiences];
                                                updated[idx] = e.target.value;
                                                setFormData(prev => ({ ...prev, experiences: updated }));
                                            }}
                                        />
                                        {formData.experiences.length > 1 && (
                                            <button
                                                type="button"
                                                className="btn btn-xs bg-red-600 text-white"
                                                onClick={() => setFormData(prev => ({
                                                    ...prev,
                                                    experiences: prev.experiences.filter((_, i) => i !== idx)
                                                }))}
                                            >Remove</button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="btn btn-sm mt-1 bg-purple-600 text-white"
                                    onClick={() =>
                                        setFormData(prev => ({
                                            ...prev,
                                            experiences: [...prev.experiences, ""]
                                        }))
                                    }
                                >
                                    + Add Experience
                                </button>
                            </div>

                            {/* Achievements */}
                            <div>
                                <label className="font-semibold">My Accomplishments</label>
                                {formData.achievements.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-2 mb-1">
                                        <input
                                            type="text"
                                            className="input input-bordered w-full bg-slate-200"
                                            value={item}
                                            onChange={e => {
                                                const updated = [...formData.achievements];
                                                updated[idx] = e.target.value;
                                                setFormData(prev => ({ ...prev, achievements: updated }));
                                            }}
                                        />
                                        {formData.achievements.length > 1 && (
                                            <button
                                                type="button"
                                                className="btn btn-xs bg-red-600 text-white"
                                                onClick={() => setFormData(prev => ({
                                                    ...prev,
                                                    achievements: prev.achievements.filter((_, i) => i !== idx)
                                                }))}
                                            >Remove</button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="btn btn-sm mt-1 bg-purple-600 text-white"
                                    onClick={() =>
                                        setFormData(prev => ({
                                            ...prev,
                                            achievements: [...prev.achievements, ""]
                                        }))
                                    }
                                >
                                    + Add Achievement
                                </button>
                            </div>

                            {/* Projects with subfields (unchanged) */}
                            <div>
                                <label className="font-semibold">Projects</label>
                                {formData.projects.map((project, index) => (
                                    <div key={index} className="border p-3 mb-2 rounded bg-slate-50">
                                        <input
                                            type="text"
                                            placeholder="Project Name"
                                            className="input input-bordered w-full mb-1 bg-slate-200"
                                            value={project.projectName}
                                            onChange={e => handleProjectFieldChange(index, 'projectName', e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Client"
                                            className="input input-bordered w-full mb-1 bg-slate-200"
                                            value={project.client}
                                            onChange={e => handleProjectFieldChange(index, 'client', e.target.value)}
                                        />
                                        <input
                                            type="number"
                                            placeholder="Team Size"
                                            className="input input-bordered w-full mb-1 bg-slate-200"
                                            value={project.teamSize}
                                            onChange={e => handleProjectFieldChange(index, 'teamSize', e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Technology"
                                            className="input input-bordered w-full mb-1 bg-slate-200"
                                            value={project.technology}
                                            onChange={e => handleProjectFieldChange(index, 'technology', e.target.value)}
                                        />
                                        <textarea
                                            placeholder="Project Description"
                                            className="input input-bordered w-full mb-1 bg-slate-200 h-40"
                                            value={project.description}
                                            onChange={e => handleProjectFieldChange(index, 'description', e.target.value)}
                                        />
                                        {formData.projects.length > 1 && (
                                            <button type="button" className="btn btn-xs bg-red-600 text-white" onClick={() => removeProjectField(index)}>Remove</button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="btn btn-sm mt-2 bg-purple-600 text-white"
                                    onClick={addProjectField}
                                >
                                    + Add Project
                                </button>
                            </div>

                            <label>Profile Photo</label>
                            <input type="file" accept="image/*" className="file-input file-input-bordered w-full bg-slate-200
                            " onChange={handleFileChange} />

                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    type="submit"
                                    className="bg-purple-600 px-4 py-2 rounded text-white flex items-center justify-center"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg
                                                className="animate-spin h-5 w-5 mr-2 text-white"
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
                                            submitting...
                                        </>
                                    ) : (
                                        'Submit'
                                    )}
                                </button>
                                <button type="button" className="btn" onClick={() => setEditingEmployer(null)}>Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}

export default EmployersList;



const Section = ({ title, children }) => (
    <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>
        {children}
    </div>
);

const Detail = ({ label, value }) => (
    <p className="text-sm"><strong>{label}:</strong> {value}</p>
);
