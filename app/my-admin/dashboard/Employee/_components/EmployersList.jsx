"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';  // Next.js router hook

function EmployersList() {
    const [employers, setEmployers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingEmployer, setEditingEmployer] = useState(null);
    const [form, setForm] = useState({
        name: '',
        email: '',
        contact: '',
        position: '',
        skills: [''],
        experiences: [''],
        photo: null,
    });
    const router = useRouter();  // Initialize the useRouter hook

    useEffect(() => {
        const fetchEmployers = async () => {
            try {
                const res = await axios.get('/api/employees');
                if (res.status === 200) {
                    setEmployers(res.data.employers);
                }
            } catch (error) {
                console.error('Error fetching employers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployers();
    }, []);

    const handleDelete = async (id) => {
        try {
            // Delete the employer via API
            await axios.delete(`/api/employees/${id}`);
            // Update state after deleting
            setEmployers((prevEmployers) => prevEmployers.filter((emp) => emp._id !== id));
            alert('Employer deleted successfully!');
            // After deletion, navigate back to the list or refresh the page

        } catch (error) {
            console.error('Error deleting employer:', error);
            alert('Error deleting employer!');
        }
    };

    const handleUpdate = (employer) => {
        setEditingEmployer(employer);
        setForm({
            name: employer.name,
            email: employer.email,
            contact: employer.contact,
            position: employer.position,
            skills: employer.skills || [''],
            experiences: employer.experiences || [''],
            photo: null,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('email', form.email);
        formData.append('contact', form.contact);
        formData.append('position', form.position);
        form.experiences.forEach((exp) => formData.append('experiences[]', exp));
        form.skills.forEach((skill) => formData.append('skills[]', skill));

        if (form.photo) {
            formData.append('photo', form.photo);
        }

        try {
            const response = editingEmployer
                ? await axios.put(`/api/employees/${editingEmployer._id}`, formData)
                : await axios.post('/api/employees', formData);

            if (response.status === 201 || response.status === 200) {
                alert('Employer data saved successfully!');
                router.push('/'); // Navigate to the list after saving
                router.refresh(); // Refresh the page to show the updated data
            }
        } catch (error) {
            console.error('Error saving employer data:', error);
            alert('Error saving employer data!');
        }
    };

    const handleFileChange = (e) => {
        setForm({ ...form, photo: e.target.files[0] });
    };

    const handleSkillsChange = (e, index) => {
        const newSkills = [...form.skills];
        newSkills[index] = e.target.value;
        setForm({ ...form, skills: newSkills });
    };

    const handleExperiencesChange = (e, index) => {
        const newExperiences = [...form.experiences];
        newExperiences[index] = e.target.value;
        setForm({ ...form, experiences: newExperiences });
    };

    const addExperienceField = () => {
        setForm({ ...form, experiences: [...form.experiences, ''] });
    };

    const addSkillField = () => {
        setForm({ ...form, skills: [...form.skills, ''] });
    };

    if (loading) return <p className="p-4 text-center">Loading...</p>;

    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 mt-5">
                {employers.length === 0 ?
                    <p className='text-center'>No Details Found</p>
                    :
                    employers.map((emp) => (
                        <div key={emp._id} className="card bg-gray-200 w-full shadow-sm hover:shadow-md transition">
                            <figure className="px-10 pt-10">
                                <img
                                    src={emp.photo ? `/uploads/${emp.photo}` : 'https://via.placeholder.com/150'}
                                    alt={emp.name}
                                    className="rounded-full w-40 h-40 object-cover"
                                />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{emp.name}</h2>
                                <p className="text-sm text-gray-600">{emp.position}</p>
                                <p className="text-sm">Experience: {emp.experiences.join(', ')}</p>
                                <p className="text-sm">Skills: {emp.skills.join(', ')}</p>
                                <div className="card-actions mt-4">
                                    <button
                                        className="btn btn-success"
                                        onClick={() => handleUpdate(emp._id)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="btn btn-error"
                                        onClick={() => handleDelete(emp._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            {/* Update Form Modal */}
            {editingEmployer && (
                <div className="modal">
                    <div className="modal-box bg-gray-200">
                        <form onSubmit={handleSubmit} className="p-4 space-y-4">
                            <input
                                type="text"
                                placeholder="Name"
                                className="p-2 border w-full"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="p-2 border w-full"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Contact"
                                className="p-2 border w-full"
                                value={form.contact}
                                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Position"
                                className="p-2 border w-full"
                                value={form.position}
                                onChange={(e) => setForm({ ...form, position: e.target.value })}
                                required
                            />

                            {/* Dynamic Experiences */}
                            <div className="space-y-2">
                                <label>Experience</label>
                                {form.experiences.map((experience, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        placeholder="Experience"
                                        className="p-2 border w-full"
                                        value={experience}
                                        onChange={(e) => handleExperiencesChange(e, index)}
                                        required
                                    />
                                ))}
                                <button
                                    type="button"
                                    className="bg-purple-600 text-white py-1 px-8 hover:scale-105 duration-300 cursor-pointer rounded"
                                    onClick={addExperienceField}
                                >
                                    Add Experience
                                </button>
                            </div>

                            {/* Dynamic Skills */}
                            <div className="space-y-2">
                                <label>Skills</label>
                                {form.skills.map((skill, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        placeholder="Skill"
                                        className="p-2 border w-full"
                                        value={skill}
                                        onChange={(e) => handleSkillsChange(e, index)}
                                        required
                                    />
                                ))}
                                <button
                                    type="button"
                                    className="bg-purple-600 text-white py-1 px-8 hover:scale-105 duration-300 cursor-pointer rounded"
                                    onClick={addSkillField}
                                >
                                    Add Skill
                                </button>
                            </div>

                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="p-2 border w-full"
                            />

                            <div className="modal-action">
                                <button type="submit" className="bg-purple-600 text-white py-2 px-4 rounded">
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={() => setEditingEmployer(null)}  // Close the modal without saving
                                >
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

export default EmployersList;
