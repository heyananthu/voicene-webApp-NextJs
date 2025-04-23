'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import EmployersList from './_components/EmployersList';
import { ToastContainer, toast, Bounce } from 'react-toastify';

function Page() {
  const router = useRouter();

  const [form, setForm] = useState({
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

  // Update individual item in array fields
  const updateFieldArray = (type, value, index) => {
    const updated = [...form[type]];
    updated[index] = value;
    setForm({ ...form, [type]: updated });
  };

  // Add new empty input to array fields
  const addField = (type) => {
    setForm({ ...form, [type]: [...form[type], ''] });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setForm({ ...form, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Filter out empty strings from array fields before appending
    const filteredArrays = {};
    ['skills', 'experiences', 'projects', 'softskills', 'education', 'achievements'].forEach((field) => {
      filteredArrays[field] = form[field].map(item => item.trim()).filter(Boolean);
    });

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('contact', form.contact);
    formData.append('position', form.position);

    // Append filtered arrays properly (without [] in key)
    Object.entries(filteredArrays).forEach(([field, arr]) => {
      arr.forEach(item => formData.append(field, item));
    });

    formData.append('gender', form.gender);
    formData.append('nationality', form.nationality);
    formData.append('dob', form.dob);
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
        document.getElementById('my_modal_1').close();

        // Optionally reset form here if needed
        setForm({
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
          language: '',
          photo: null,
        });
      } else if (response.status === 409) {
        toast.error('Details Already Exist', {
          position: 'top-center',
          theme: 'colored',
          transition: Bounce,
        });
      }
    } catch (err) {
      toast.error('Error submitting form', {
        position: 'top-center',
        theme: 'colored',
        transition: Bounce,
      });
      console.error('Form submission error:', err);
    }
  };

  return (
    <div className="w-full bg-white h-screen mt-20 px-4" suppressHydrationWarning>
      <ToastContainer />
      <div className="flex justify-end mb-4">
        <button
          className="bg-purple-600 py-2 px-5 text-white rounded-md hover:scale-105 transition"
          onClick={() => document.getElementById('my_modal_1').showModal()}
        >
          Create +
        </button>
      </div>

      <EmployersList />

      <dialog id="my_modal_1" className="modal">
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
              required
            />

            <input
              type="date"
              placeholder="Date of Birth"
              className="input input-bordered w-full bg-slate-50"
              value={form.dob}
              onChange={(e) => setForm({ ...form, dob: e.target.value })}
            />

            <input
              type="text"
              placeholder="Nationality"
              className="input input-bordered w-full bg-slate-50"
              value={form.nationality}
              onChange={(e) => setForm({ ...form, nationality: e.target.value })}
              required
            />


            <input
              type="text"
              placeholder="Language"
              className="input input-bordered w-full bg-slate-50"
              value={form.language}
              onChange={(e) => setForm({ ...form, language: e.target.value })}
            />
            

            {/* Dynamic Fields */}
            {['education', 'skills', 'softskills', 'experiences', 'projects', 'achievements'].map((field) => (
              <div key={field}>
                <label className="font-semibold capitalize">{field}</label>
                {form[field].map((item, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder={field.slice(0, -1)}
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


            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full bg-slate-50"
              onChange={handleFileChange}
            />

            <div className="modal-action">
              <button type="submit" className="btn bg-purple-600 text-white">
                Submit
              </button>
              <button type="button" className="btn" onClick={() => document.getElementById('my_modal_1').close()}>
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
