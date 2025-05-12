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

function EmployersList() {
    const [employers, setEmployers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [selectedEmployer, setSelectedEmployer] = useState(null);
    const [editingEmployer, setEditingEmployer] = useState(null);
    const [formData, setFormData] = useState({
        name: '', email: '', contact: '', position: '', gender: '', dob: '', doj: '', nationality: '', language: '',
        education: [], skills: [], softskills: [], experiences: [], projects: [], achievements: []
    });
    const [photo, setPhoto] = useState(null); // state for file input

    const router = useRouter();

    useEffect(() => {
        const adminStatus = localStorage.getItem('admin');
        if (adminStatus !== 'authenticated') router.push('/my-admin');
    }, [router]);

    useEffect(() => {
        setLoading(true);
        const fetchEmployers = async () => {
            try {
                const res = await axios.get('/api/employees');
                if (res.status === 200) setEmployers(res.data.employers);
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchEmployers();
    }, []);

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`/api/employees/${id}`);
            if (res.status === 200) {
                toast.success('Details Deleted...', { position: 'top-center', theme: 'colored', transition: Bounce });
                setEmployers((prev) => prev.filter((emp) => emp._id !== id));
            }
        } catch (error) {
            console.error('Delete Error:', error);
        }
    };

    const handleEdit = (emp) => {
        setEditingEmployer(emp._id);
        setFormData({
            ...emp,
            dob: new Date(emp.dob).toISOString().split('T')[0],
            doj: new Date(emp.doj).toISOString().split('T')[0] // ✅ Convert DOJ too
        });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSubmit = new FormData();

        // Loop through formData object and append each field to FormData
        for (const [key, value] of Object.entries(formData)) {
            if (Array.isArray(value)) {
                // Handle array fields
                value.forEach((item) => {
                    if (typeof item === 'string' && item.trim()) {  // Ensure the item is a string before trimming
                        formDataToSubmit.append(key, item.trim()); // Use key without "[]" in the name
                    }
                });
            } else {
                if (typeof value === 'string' && value.trim()) {  // Ensure value is a string before trimming
                    formDataToSubmit.append(key, value.trim());
                }
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
                    skills: [''],
                    projects: [''],
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
    };



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleArrayChange = (e, field) => {
        const { value } = e.target;
        // Split by comma, remove extra spaces and empty strings
        setFormData((prev) => ({
            ...prev,
            [field]: value.split(',').map(item => item.trim()).filter(item => item !== ''),
        }));
    };



    const handleFileChange = (e) => {
        setPhoto(e.target.files[0]); // Save the selected file
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
                            <button onClick={(e) => { e.stopPropagation(); handleDelete(emp?._id); }} className="text-red-600 cursor-pointer"><MdDelete size={25} /></button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Resume Modal */}
            {selectedEmployer && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center text-black">
                    <div className="bg-white w-[90%] max-w-3xl p-6 rounded-lg overflow-y-auto max-h-[90vh] relative">
                        <button className="absolute top-2 right-2 text-5xl font-normal cursor-pointer " onClick={() => setSelectedEmployer(null)}>×</button>
                        <div className="flex items-center gap-6 mb-4">
                            {/* Safely access the photo property */}
                            <Image src={selectedEmployer.photo ? `/uploads/${selectedEmployer.photo}` : defaultavatar} alt="photo" width={80} height={80} className="rounded-full" />
                            <div>
                                <h2 className="text-xl font-bold">{selectedEmployer.name}</h2>
                                <p className="text-gray-500">{selectedEmployer.position}</p>
                                <p className="text-sm text-gray-700">{selectedEmployer.email} | {selectedEmployer.contact}</p>
                            </div>
                        </div>

                        <div className="space-y-3 text-sm text-gray-700">
                            <p><strong>Gender:</strong> {selectedEmployer.gender}</p>
                            <p><strong>DOB:</strong> {new Date(selectedEmployer.dob).toLocaleDateString()}</p>
                            <p><strong>Nationality:</strong> {selectedEmployer.nationality}</p>
                            <p><strong>Language:</strong> {selectedEmployer.language}</p>
                            <p><strong>DOJ:</strong> {new Date(selectedEmployer.doj).toLocaleDateString()}</p>
                            <p><strong>Education:</strong> {selectedEmployer.education.join(', ')}</p>
                            <p><strong>Skills:</strong> {selectedEmployer.skills.join(', ')}</p>
                            <p><strong>Soft Skills:</strong> {selectedEmployer.softskills.join(', ')}</p>
                            <p><strong>Experience:</strong> {selectedEmployer.experiences.join(', ')}</p>
                            <p><strong>Projects:</strong> {selectedEmployer.projects.join(', ')}</p>
                            <p><strong>Achievements:</strong> {selectedEmployer.achievements.join(', ')}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editingEmployer && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center text-black">
                    <div className="bg-white p-6 rounded-lg max-w-xl w-full overflow-y-auto max-h-[90vh]">
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div>
                                <label className="block text-sm font-semibold">Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full border rounded p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold">Email</label>
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full border rounded p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold">Contact</label>
                                <input type="text" name="contact" value={formData.contact} onChange={handleInputChange} className="w-full border rounded p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold">Position</label>
                                <input type="text" name="position" value={formData.position} onChange={handleInputChange} className="w-full border rounded p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold">Gender</label>
                                <input type="text" name="gender" value={formData.gender} onChange={handleInputChange} className="w-full border rounded p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold">Date of Birth</label>
                                <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} className="input bg-slate-300 w-full border rounded p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold">Nationality</label>
                                <input type="text" name="nationality" value={formData.nationality} onChange={handleInputChange} className="w-full border rounded p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold">Language</label>
                                <input type="text" name="language" value={formData.language} onChange={handleInputChange} className="w-full border rounded p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold">Date of Join</label>
                                <input type="date" name="doj" value={formData.doj} onChange={handleInputChange} className="input bg-slate-300 w-full border rounded p-2" />
                            </div>
                            {/* Education */}
                            <div>
                                <label className="block text-sm font-semibold">Education</label>
                                {formData.education.map((item, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        value={item}
                                        onChange={(e) => {
                                            const updated = [...formData.education];
                                            updated[index] = e.target.value;
                                            setFormData((prev) => ({ ...prev, education: updated }));
                                        }}
                                        className="w-full border rounded p-2 mb-2"
                                    />
                                ))}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setFormData((prev) => ({ ...prev, education: [...prev.education, ''] }))
                                    }
                                    className="text-blue-600 text-sm"
                                >
                                    + Add Education
                                </button>
                            </div>

                            {/* Skills */}
                            <div>
                                <label className="block text-sm font-semibold">Skills</label>
                                {formData.skills.map((item, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        value={item}
                                        onChange={(e) => {
                                            const updated = [...formData.skills];
                                            updated[index] = e.target.value;
                                            setFormData((prev) => ({ ...prev, skills: updated }));
                                        }}
                                        className="w-full border rounded p-2 mb-2"
                                    />
                                ))}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setFormData((prev) => ({ ...prev, skills: [...prev.skills, ''] }))
                                    }
                                    className="text-blue-600 text-sm"
                                >
                                    + Add Skill
                                </button>
                            </div>

                            {/* Soft Skills */}
                            <div>
                                <label className="block text-sm font-semibold">Soft Skills</label>
                                {formData.softskills.map((item, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        value={item}
                                        onChange={(e) => {
                                            const updated = [...formData.softskills];
                                            updated[index] = e.target.value;
                                            setFormData((prev) => ({ ...prev, softskills: updated }));
                                        }}
                                        className="w-full border rounded p-2 mb-2"
                                    />
                                ))}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setFormData((prev) => ({ ...prev, softskills: [...prev.softskills, ''] }))
                                    }
                                    className="text-blue-600 text-sm"
                                >
                                    + Add Soft Skill
                                </button>
                            </div>

                            {/* Experiences */}
                            <div>
                                <label className="block text-sm font-semibold">Experiences</label>
                                {formData.experiences.map((item, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        value={item}
                                        onChange={(e) => {
                                            const updated = [...formData.experiences];
                                            updated[index] = e.target.value;
                                            setFormData((prev) => ({ ...prev, experiences: updated }));
                                        }}
                                        className="w-full border rounded p-2 mb-2"
                                    />
                                ))}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setFormData((prev) => ({ ...prev, experiences: [...prev.experiences, ''] }))
                                    }
                                    className="text-blue-600 text-sm"
                                >
                                    + Add Experience
                                </button>
                            </div>

                            {/* Projects */}
                            <div>
                                <label className="block text-sm font-semibold">Projects</label>
                                {formData.projects.map((item, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        value={item}
                                        onChange={(e) => {
                                            const updated = [...formData.projects];
                                            updated[index] = e.target.value;
                                            setFormData((prev) => ({ ...prev, projects: updated }));
                                        }}
                                        className="w-full border rounded p-2 mb-2"
                                    />
                                ))}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setFormData((prev) => ({ ...prev, projects: [...prev.projects, ''] }))
                                    }
                                    className="text-blue-600 text-sm"
                                >
                                    + Add Project
                                </button>
                            </div>

                            {/* Achievements */}
                            <div>
                                <label className="block text-sm font-semibold">Achievements</label>
                                {formData.achievements.map((item, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        value={item}
                                        onChange={(e) => {
                                            const updated = [...formData.achievements];
                                            updated[index] = e.target.value;
                                            setFormData((prev) => ({ ...prev, achievements: updated }));
                                        }}
                                        className="w-full border rounded p-2 mb-2"
                                    />
                                ))}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setFormData((prev) => ({ ...prev, achievements: [...prev.achievements, ''] }))
                                    }
                                    className="text-blue-600 text-sm"
                                >
                                    + Add Achievement
                                </button>
                            </div>


                            {/* <div>
                                <label className="block text-sm font-semibold">Photo</label>
                                <input type="file" onChange={handleFileChange} className="w-full border rounded p-2" />
                            </div> */}

                            <div className="mt-4 flex justify-end gap-4">
                                <button type="button" onClick={() => setEditingEmployer(null)} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <ToastContainer />
        </div>
    );
}

export default EmployersList;

