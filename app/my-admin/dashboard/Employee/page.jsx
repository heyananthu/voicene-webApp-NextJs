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
    photo: null,
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure this only runs on client
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('contact', form.contact);
    formData.append('position', form.position);
    form.skills.forEach((skill) => formData.append('skills[]', skill));
    form.experiences.forEach((exp) => formData.append('experiences[]', exp));
    if (form.photo) formData.append('photo', form.photo);

    try {
      const response = await axios.post('/api/employees', formData);
      console.log("res:", response.status)
      if (response.status === 201) {
        toast.success('New Details Added', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });

        document.getElementById('my_modal_1').close()
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

  const updateFieldArray = (type, value, index) => {
    const updated = [...form[type]];
    updated[index] = value;
    setForm({ ...form, [type]: updated });
  };

  const addField = (type) => {
    setForm({ ...form, [type]: [...form[type], ''] });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, photo: e.target.files[0] });
  };

  return (
    <div
      className="w-full bg-white h-screen mt-20 px-4"
      suppressHydrationWarning
    >
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
              type="email"
              placeholder="Email"
              className="input input-bordered w-full bg-slate-50"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Contact"
              className="input input-bordered w-full bg-slate-50"
              value={form.contact}
              onChange={(e) => setForm({ ...form, contact: e.target.value })}
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

            {/* Experience Fields */}
            <div>
              <label className="font-semibold">Experience</label>
              {form.experiences.map((exp, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder="Experience"
                  className="input input-bordered w-full mt-1 bg-slate-50"
                  value={exp}
                  onChange={(e) =>
                    updateFieldArray('experiences', e.target.value, index)
                  }
                />
              ))}
              <button
                type="button"
                className="btn btn-sm mt-2 bg-purple-600 text-white"
                onClick={() => addField('experiences')}
              >
                + Add Experience
              </button>
            </div>

            {/* Skills Fields */}
            <div>
              <label className="font-semibold">Skills</label>
              {form.skills.map((skill, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder="Skill"
                  className="input input-bordered w-full mt-1 bg-slate-50"
                  value={skill}
                  onChange={(e) =>
                    updateFieldArray('skills', e.target.value, index)
                  }
                />
              ))}
              <button
                type="button"
                className="btn btn-sm mt-2 bg-purple-600 text-white"
                onClick={() => addField('skills')}
              >
                + Add Skill
              </button>
            </div>

            <input
              type="file"
              onChange={handleFileChange}
              className="file-input file-input-bordered w-full bg-slate-50"
              accept="image/*"
            />

            <div className="flex justify-end gap-3">
              <button type="submit" className="btn bg-purple-600 text-white" onClick={handleSubmit}>
                Submit
              </button>
              <button
                type="button"
                className="btn bg-slate-600 text-white"
                onClick={() => document.getElementById('my_modal_1').close()}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>

      <ToastContainer />
    </div>
  );
}

export default Page;
