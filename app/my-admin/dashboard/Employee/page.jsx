'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import EmployersList from './_components/EmployersList';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Label } from 'flowbite-react';

function Page() {
  const router = useRouter();
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Updated projects to be array of objects
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
        description: ''
      }
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

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const adminStatus = localStorage.getItem('admin');
      if (adminStatus !== 'authenticated') {
        toast.error('Unauthorized access', {
          position: 'top-center',
          autoClose: 3000,
          theme: 'colored',
          transition: Bounce,
        });
        router.push('/my-admin');
      }
    }
  }, [router]);

  if (!isClient) return null;

  // For simple array fields
  const updateFieldArray = (type, value, index) => {
    const updated = [...form[type]];
    updated[index] = value;
    setForm({ ...form, [type]: updated });
  };

  const addField = (type) => {
    setForm({ ...form, [type]: [...form[type], ''] });
  };

  // For project subfields
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
          description: ''
        }
      ]
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
      p => p.projectName.trim() || p.client.trim() || p.teamSize.trim() || p.technology.trim() || p.description.trim()
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

    // Send projects as JSON string
    formData.append('projects', JSON.stringify(filteredProjects));

    formData.append('gender', form.gender);
    formData.append('nationality', form.nationality);
    formData.append('dob', form.dob);
    formData.append('doj', form.doj);
    formData.append('language', form.language);

    if (form.photo) formData.append('photo', form.photo);

    try {
      const response = await axios.post('/api/employees', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        toast.success('New Details Added', {
          position: 'top-center',
          autoClose: 5000,
          theme: 'colored',
          transition: Bounce,
        });
        setIsSubmitting(false);
        document.getElementById('my_modal_1').close();

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
              description: ''
            }
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

  return (
    <div className="w-full bg-white min-h-screen mt-20 px-4 relative" suppressHydrationWarning>
      {/* Toast container rendered at top level */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        transition={Bounce}
        theme="colored"
        toastClassName="!z-[9999]" // Ensures toast is above all other elements (including modal)
      />

      <div className="flex justify-end mb-4">
        <button
          className="bg-purple-600 py-2 px-5 text-white rounded-md hover:scale-105 transition"
          onClick={() => document.getElementById('my_modal_1').showModal()}
        >
          Create +
        </button>
      </div>
      <EmployersList />

      <dialog id="my_modal_1" className="modal z-[50]">
        <div className="modal-box bg-gray-200 max-w-xl">
          <form onSubmit={handleSubmit} className="space-y-4 text-black">
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full bg-slate-50"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Position"
              className="input input-bordered w-full bg-slate-50"
              value={form.position}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full bg-slate-50"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            {isDuplicate && (
              <p className='text-rose-600'>Email Already Exist</p>
            )}
            <input
              type="text"
              placeholder="Contact Number"
              className="input input-bordered w-full bg-slate-50"
              value={form.contact}
              onChange={(e) => setForm({ ...form, contact: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Gender"
              className="input input-bordered w-full bg-slate-50"
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
            />
            <label>Date of Birth</label><br />
            <input
              type="date"
              className="input bg-slate-300"
              placeholder="Date of Birth"
              value={form.dob}
              onChange={(e) => setForm({ ...form, dob: e.target.value })}
            />
            <input
              type="text"
              placeholder="Nationality"
              className="input input-bordered w-full bg-slate-50"
              value={form.nationality}
              onChange={(e) => setForm({ ...form, nationality: e.target.value })}
            />
            <input
              type="text"
              placeholder="Language Proficiency"
              className="input input-bordered w-full bg-slate-50"
              value={form.language}
              onChange={(e) => setForm({ ...form, language: e.target.value })}
            />
            <label>Date of Join</label><br />
            <input
              type="date"
              className="input bg-slate-300"
              placeholder="Date of Join"
              value={form.doj}
              onChange={(e) => setForm({ ...form, doj: e.target.value })}
            />
            <input
              type="text"
              placeholder="Total Experience"
              className="input input-bordered w-full bg-slate-50"
              value={form.totalexperience}
              onChange={(e) => setForm({ ...form, totalexperience: e.target.value })}
            />

            {/* Dynamic fields (except projects) */}
            {['education', 'skills', 'softskills', 'experiences', 'achievements'].map((field) => (
              <div key={field}>
                <label className="font-semibold capitalize">{field}</label>
                {form[field].map((item, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder={field}
                    className="input input-bordered w-full mt-1 bg-slate-50"
                    value={item}
                    onChange={(e) => updateFieldArray(field, e.target.value, index)}
                  />
                ))}
                <button
                  type="button"
                  className="btn btn-sm mt-2 bg-purple-600 text-white"
                  onClick={() => addField(field)}
                >
                  + Add
                </button>
              </div>
            ))}

            {/* Projects with subfields */}
            <div>
              <label className="font-semibold">Projects</label>
              {form.projects.map((project, index) => (
                <div key={index} className="border p-3 mb-2 rounded bg-slate-50">
                  <input
                    type="text"
                    placeholder="Project Name"
                    className="input input-bordered w-full mb-1 bg-slate-300"
                    value={project.projectName}
                    onChange={e => updateProjectField(index, 'projectName', e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Client"
                    className="input input-bordered w-full mb-1 bg-slate-300"
                    value={project.client}
                    onChange={e => updateProjectField(index, 'client', e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Team Size"
                    className="input input-bordered w-full mb-1 bg-slate-300"
                    value={project.teamSize}
                    onChange={e => updateProjectField(index, 'teamSize', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Technology"
                    className="input input-bordered w-full mb-1 bg-slate-300"
                    value={project.technology}
                    onChange={e => updateProjectField(index, 'technology', e.target.value)}
                  />
                  <textarea
                    placeholder="Project Description"
                    className="input input-bordered w-full h-44 mb-1 bg-slate-300"
                    value={project.description}
                    onChange={e => updateProjectField(index, 'description', e.target.value)}
                  />
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

            <label>Profile</label>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full bg-slate-50"
              placeholder='Profile'
              onChange={handleFileChange}
            />
            {error && (
              <p className='text-red-700 text-center p-4'>Error submitting form, please try Again</p>
            )}
            <div className="modal-action">
              <button
                type="submit"
                className=" bg-purple-600 px-4 py-2 rounded text-white flex items-center justify-center"
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

              <button
                type="button"
                className="btn"
                onClick={() => document.getElementById('my_modal_1').close()}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Page;
