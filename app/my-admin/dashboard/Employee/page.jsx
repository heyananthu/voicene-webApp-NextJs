"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import EmployersList from './_components/EmployersList';

function Page() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    email: '',
    contact: '',
    experiences: [''],
    position: '',
    skills: [''],
    photo: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('contact', form.contact);
    formData.append('position', form.position);

    form.experiences.forEach((exp) => formData.append('experiences[]', exp));
    form.skills.forEach((skill) => formData.append('skills[]', skill));
    if (form.photo) formData.append('photo', form.photo);

    try {
      const response = await axios.post('/api/employees', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 201) {
        alert('Data entered successfully');
        console.log('Employer created:', response.data);
        router.push('/my-admin/Employee')
      }
    } catch (error) {
      console.error('Error creating employer:', error);
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

  const addSkillField = () => {
    setForm({ ...form, skills: [...form.skills, ''] });
  };

  const addExperienceField = () => {
    setForm({ ...form, experiences: [...form.experiences, ''] });
  };

  return (
    <div className="w-full bg-white h-full lg:h-screen mt-20">
      <div className="flex justify-end">
        <button
          className="bg-purple-600 py-2 px-5 text-white  rounded-md cursor-pointer"
          onClick={() => document.getElementById('my_modal_1').showModal()}
        >
          Create +
        </button>
      </div>

      <EmployersList />

      <dialog id="my_modal_1" className="modal">
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
                Add
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
                Add
              </button>
            </div>

            <input
              type="file"
              onChange={handleFileChange}
              className="p-2 border w-full"
              accept="image/*"
            />

            <div className="flex justify-end gap-4 mt-4">
              <button
                type="submit"
                className="bg-purple-600 text-white px-3 py-2 rounded cursor-pointer"
              >
                Submit
              </button>
              <button className="btn" type="button" onClick={() => document.getElementById('my_modal_1').close()}>
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
