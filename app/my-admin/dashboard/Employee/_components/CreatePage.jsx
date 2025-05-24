import React, { useState } from 'react';
import axios from 'axios';
import { toast, Bounce } from 'react-toastify';
import { Label } from 'flowbite-react';

function CreatePage({ onEmployerCreated }) {
    const [isDuplicate, setIsDuplicate] = useState(false);
    const [error, setError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [form, setForm] = useState({
        name: '',
        email: '',
        contact: '',
        experiences: [''],
        position: '',
        totalexperience: '',
        skills: [''],
        projects: [
            {
                projectName: '',
                client: '',
                teamSize: '',
                technology: '',
                description: [''],
            },
        ],
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

    // Helpers for array fields
    const updateFieldArray = (type, value, index) => {
        const updated = [...form[type]];
        updated[index] = value;
        setForm({ ...form, [type]: updated });
    };

    const addField = (type) => {
        setForm({ ...form, [type]: [...form[type], ''] });
    };

    // Project subfields
    const updateProjectField = (index, field, value) => {
        const updatedProjects = [...form.projects];
        updatedProjects[index][field] = value;
        setForm({ ...form, projects: updatedProjects });
    };

    const addProjectField = () => {
        setForm({
            ...form,
            projects: [
                ...form.projects,
                {
                    projectName: '',
                    client: '',
                    teamSize: '',
                    technology: '',
                    description: [''],
                },
            ],
        });
    };

    const handleFileChange = (e) => {
        setForm({ ...form, photo: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const filteredArrays = {};
        ['skills', 'experiences', 'softskills', 'education', 'achievements'].forEach((field) => {
            filteredArrays[field] = form[field].map(item => item.trim()).filter(Boolean);
        });

        // Filter projects: remove empty ones
        const filteredProjects = form.projects.filter(
            p =>
                p.projectName.trim() ||
                p.client.trim() ||
                p.teamSize.trim() ||
                p.technology.trim() ||
                (Array.isArray(p.description)
                    ? p.description.filter(d => d.trim() !== '').length > 0
                    : p.description.trim())
        );

        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('email', form.email);
        formData.append('contact', form.contact);
        formData.append('position', form.position);
        formData.append('totalexperience', form.totalexperience);
        Object.entries(filteredArrays).forEach(([field, arr]) => {
            arr.forEach(item => formData.append(field, item));
        });
        formData.append('projects', JSON.stringify(filteredProjects));
        formData.append('gender', form.gender);
        formData.append('nationality', form.nationality);
        formData.append('dob', form.dob);
        formData.append('doj', form.doj);
        formData.append('language', form.language);
        if (form.photo) formData.append('photo', form.photo);

        try {
            const response = await axios.post('/api/employees', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            if (response.status === 201) {
                toast.success('New Details Added');
                onEmployerCreated();
                setIsSubmitting(false);
                setForm({
                    name: '',
                    email: '',
                    contact: '',
                    experiences: [''],
                    position: '',
                    totalexperience: '',
                    skills: [''],
                    projects: [
                        {
                            projectName: '',
                            client: '',
                            teamSize: '',
                            technology: '',
                            description: [''],
                        },
                    ],
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
            }
        } catch (err) {
            if (err.response && err.response.status === 409) {
                setIsDuplicate(true);
                toast.error('Details Already Exist', {
                    position: 'top-center',
                    theme: 'colored',
                    transition: Bounce,
                });
            } else {
                setError(true);
                toast.error('Error submitting form', {
                    position: 'top-center',
                    theme: 'colored',
                    transition: Bounce,
                });
                console.error('Form submission error:', err);
            }
            setIsSubmitting(false);
        }
    };

    // Description points for projects
    const updateDescriptionPoint = (projectIndex, descIndex, value) => {
        const updatedProjects = [...form.projects];
        updatedProjects[projectIndex].description[descIndex] = value;
        setForm({ ...form, projects: updatedProjects });
    };

    const addDescriptionPoint = (projectIndex) => {
        const updated = [...form.projects];
        const currentDesc = updated[projectIndex].description;
        if (!Array.isArray(currentDesc)) {
            updated[projectIndex].description = currentDesc ? [currentDesc] : [''];
        }
        updated[projectIndex].description.push('');
        setForm({ ...form, projects: updated });
    };

    const removeDescriptionPoint = (projectIndex, descIndex) => {
        const updatedProjects = [...form.projects];
        updatedProjects[projectIndex].description.splice(descIndex, 1);
        setForm({ ...form, projects: updatedProjects });
    };

    // Render form (simplified for brevity)
    return (
        <form onSubmit={handleSubmit}>
            {/* Example fields; add your actual form fields here */}
            <div>
                <Label>Name</Label>
                <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                />
            </div>
            {/* Add other fields, array fields, project fields, file input, etc. */}
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Add Employer'}
            </button>
        </form>
    );
}

export default CreatePage;
