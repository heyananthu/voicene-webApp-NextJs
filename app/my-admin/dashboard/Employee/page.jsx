"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import EmployersList from './_components/EmployersList';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdDelete } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

function Page() {
  const router = useRouter();
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    contact: '',
    experiences: [{ company: '', jobRole: '', jobDescription: '' }],
    position: '',
    totalexperience: '',
    skills: [''],
    projects: [{ projectName: '', client: '', teamSize: '', technology: '', description: [''] }],
    softskills: [''],
    education: [{ school: '', course: '', year: '' }],
    achievements: [''],
    gender: '',
    nationality: '',
    dob: '',
    doj: '',
    language: '',
    photo: null,
  });

  const [isClient, setIsClient] = useState(false);

  // Fetch employers
  const fetchEmployers = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/employees');
      if (res.status === 200) setEmployers(res.data.employers);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployers();
  }, []);

  const handleEdit = (employer) => {
    setForm({
      name: employer.name || '',
      email: employer.email || '',
      contact: employer.contact || '',
      experiences: employer.experiences || [{ company: '', jobRole: '', jobDescription: '' }],
      position: employer.position || '',
      totalexperience: employer.totalexperience || '',
      skills: employer.skills || [''],
      projects: employer.projects || [{ projectName: '', client: '', teamSize: '', technology: '', description: [''] }],
      softskills: employer.softskills || [''],
      education: employer.education || [{ school: '', course: '', year: '' }],
      achievements: employer.achievements || [''],
      gender: employer.gender || '',
      nationality: employer.nationality || '',
      dob: employer.dob ? employer.dob.slice(0, 10) : '',
      doj: employer.doj ? employer.doj.slice(0, 10) : '',
      language: employer.language || '',
      photo: null
    });

    setEditingId(employer.id);
    document.getElementById('my_modal_1').showModal();
  };

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

  const updateFieldArray = (type, value, index) => {
    const updated = [...form[type]];
    updated[index] = value;
    setForm({ ...form, [type]: updated });
  };

  const addField = (type) => {
    setForm({ ...form, [type]: [...form[type], ''] });
  };

  const removeField = (type, index) => {
    const updated = [...form[type]];
    updated.splice(index, 1);
    setForm({ ...form, [type]: updated });
  };

  const updateProjectField = (index, field, value) => {
    const updatedProjects = [...form.projects];
    updatedProjects[index][field] = value;
    setForm({ ...form, projects: updatedProjects });
  };

  const removeProjectField = (index) => {
    const updatedProjects = [...form.projects];
    updatedProjects.splice(index, 1);
    setForm({ ...form, projects: updatedProjects });
  };

  const updateEducationField = (index, field, value) => {
    const updated = [...form.education];
    updated[index][field] = value;
    setForm({ ...form, education: updated });
  };

  const addEducationField = () => {
    setForm({
      ...form,
      education: [...form.education, { school: '', course: '', year: '' }]
    });
  };

  const removeEducationField = (index) => {
    const updated = [...form.education];
    updated.splice(index, 1);
    setForm({ ...form, education: updated });
  };

  const updateExperienceField = (index, field, value) => {
    const updated = [...form.experiences];
    updated[index][field] = value;
    setForm({ ...form, experiences: updated });
  };

  const addExperienceField = () => {
    setForm({
      ...form,
      experiences: [...form.experiences, { company: '', jobRole: '', jobDescription: '' }]
    });
  };

  const removeExperienceField = (index) => {
    const updated = [...form.experiences];
    updated.splice(index, 1);
    setForm({ ...form, experiences: updated });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, photo: e.target.files[0] });
  };

  const handleCloseModal = () => {
    document.getElementById('my_modal_1').close();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const filteredArrays = {};
    ['skills', 'softskills', 'achievements'].forEach((field) => {
      filteredArrays[field] = form[field].map(item => item.trim()).filter(Boolean);
    });

    const filteredProjects = form.projects.filter(
      p =>
        p.projectName.trim() ||
        p.client.trim() ||
        p.teamSize.trim() ||
        p.technology.trim() ||
        (Array.isArray(p.description) ? p.description.some(d => d.trim()) : false)
    );

    const filteredEducation = form.education.filter(
      edu => edu.school.trim() || edu.course.trim() || edu.year.trim()
    );

    const filteredExperiences = form.experiences.filter(
      exp => exp.company.trim() || exp.jobRole.trim() || exp.jobDescription.trim()
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
    formData.append('education', JSON.stringify(filteredEducation));
    formData.append('experiences', JSON.stringify(filteredExperiences));

    formData.append('gender', form.gender);
    formData.append('nationality', form.nationality);
    formData.append('dob', form.dob);
    formData.append('doj', form.doj);
    formData.append('language', form.language);

    if (form.photo) {
      formData.append('photo', form.photo);
    }

    try {
      let response;

      if (editingId) {
        response = await axios.put(`/api/employees/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        response = await axios.post('/api/employees', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      if (response.status === 200 || response.status === 201) {
        toast.success(editingId ? 'Details Updated' : 'New Details Added');
        await fetchEmployers();
        handleCloseModal();
        setIsSubmitting(false);

        setForm({
          name: '',
          email: '',
          contact: '',
          experiences: [{ company: '', jobRole: '', jobDescription: '' }],
          position: '',
          totalexperience: '',
          skills: [''],
          projects: [{ projectName: '', client: '', teamSize: '', technology: '', description: [''] }],
          softskills: [''],
          education: [{ school: '', course: '', year: '' }],
          achievements: [''],
          gender: '',
          nationality: '',
          dob: '',
          doj: '',
          language: '',
          photo: null,
        });

        setEditingId(null);
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

  const updateDescriptionPoint = (projectIndex, descIndex, value) => {
    const updatedProjects = [...form.projects];
    updatedProjects[projectIndex].description[descIndex] = value;
    setForm({ ...form, projects: updatedProjects });
  };

  const addDescriptionPoint = (projectIndex) => {
    const updated = [...form.projects];
    if (!Array.isArray(updated[projectIndex].description)) {
      updated[projectIndex].description = updated[projectIndex].description
        ? [updated[projectIndex].description]
        : [''];
    }
    updated[projectIndex].description.push('');
    setForm({ ...form, projects: updated });
  };

  const removeDescriptionPoint = (projectIndex, descIndex) => {
    const updatedProjects = [...form.projects];
    updatedProjects[projectIndex].description.splice(descIndex, 1);
    setForm({ ...form, projects: updatedProjects });
  };

  const addProjectField = () => {
    setForm(prevForm => ({
      ...prevForm,
      projects: [
        ...prevForm.projects,
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

  return (
    <div className="w-full h-screen bg-white py-16 px-4 sm:px-6 lg:px-8 p-12 relative "  suppressHydrationWarning>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        closeOnClick
        pauseOnHover
        draggable
        transition={Bounce}
        theme="colored"
        toastClassName="!z-[9999]"
      />

      <div className="flex justify-end mb-6 max-w-screen-xl mx-auto">
        <motion.button
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-6 rounded-lg font-medium shadow-md hover:shadow-xl transition-all duration-300 mt-12"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById('my_modal_1').showModal()}
        >
          Create +
        </motion.button>
      </div>

      <div className="max-w-screen-xl mx-auto">
        <EmployersList employers={employers} setEmployers={setEmployers} loading={loading} error={error} onEdit={handleEdit} />
      </div>

      <AnimatePresence>
        <dialog id="my_modal_1" className="modal z-[50]">
          <motion.div
            className="modal-box bg-white w-[95%] max-w-3xl p-6 sm:p-8 lg:p-10 rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6 text-gray-800 tracking-tight">
              {editingId ? 'Edit Employer Details' : 'Add New Employer'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Fields */}
              {[
                { name: 'name', placeholder: 'Name', required: true },
                { name: 'email', placeholder: 'Email', type: 'email', required: true },
                { name: 'contact', placeholder: 'Contact Number' },
                { name: 'position', placeholder: 'Position' },
                { name: 'totalexperience', placeholder: 'Total Experience' },
                { name: 'gender', placeholder: 'Gender' },
                { name: 'nationality', placeholder: 'Nationality' },
                { name: 'language', placeholder: 'Languages' }
              ].map(({ name, placeholder, type = 'text', required }) => (
                <div key={name} className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">{placeholder}</label>
                  <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    className="input input-bordered w-full bg-gray-100 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200"
                    value={form[name]}
                    onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                    required={required}
                  />
                  {name === 'email' && isDuplicate && (
                    <p className="text-rose-600 text-sm mt-1">Email Already Exists</p>
                  )}
                </div>
              ))}

              {/* Date Fields */}
              {[
                { name: 'dob', label: 'Date of Birth' },
                { name: 'doj', label: 'Date of Joining' }
              ].map(({ name, label }) => (
                <div key={name} className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input
                    type="date"
                    name={name}
                    className="input input-bordered w-full bg-gray-100 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200"
                    value={form[name]}
                    onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                  />
                </div>
              ))}

              {/* Education Section */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <label className="text-lg font-semibold text-gray-800 mb-3">Education</label>
                {form.education.map((edu, index) => (
                  <div key={index} className="space-y-3 border border-gray-200 p-4 mb-3 rounded-md relative bg-white hover:bg-blue-50 transition-colors duration-200">
                    {index > 0 && (
                      <button
                        type="button"
                        className="absolute top-2 right-2 text-red-600 hover:text-red-700 p-1 rounded-full bg-red-100 hover:bg-red-200 transition-colors duration-200"
                        onClick={() => removeEducationField(index)}
                      >
                        <MdDelete size={18} />
                      </button>
                    )}
                    {['school', 'course', 'year'].map(field => (
                      <div key={field} className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">
                          {field === 'school' ? 'School/College' : field.charAt(0).toUpperCase() + field.slice(1)}
                        </label>
                        <input
                          type="text"
                          placeholder={field === 'school' ? 'School/College' : field.charAt(0).toUpperCase() + field.slice(1)}
                          className="input input-bordered w-full bg-gray-100 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200"
                          value={edu[field]}
                          onChange={e => updateEducationField(index, field, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 mt-2"
                  onClick={addEducationField}
                >
                  + Add Education
                </button>
              </div>

              {/* Experience Section */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <label className="text-lg font-semibold text-gray-800 mb-3">Experience</label>
                {form.experiences.map((exp, index) => (
                  <div key={index} className="space-y-3 border border-gray-200 p-4 mb-3 rounded-md relative bg-white hover:bg-blue-50 transition-colors duration-200">
                    {index > 0 && (
                      <button
                        type="button"
                        className="absolute top-2 right-2 text-red-600 hover:text-red-700 p-1 rounded-full bg-red-100 hover:bg-red-200 transition-colors duration-200"
                        onClick={() => removeExperienceField(index)}
                      >
                        <MdDelete size={18} />
                      </button>
                    )}
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700 mb-1">Company</label>
                      <input
                        type="text"
                        placeholder="Company"
                        className="input input-bordered w-full bg-gray-100 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200"
                        value={exp.company}
                        onChange={e => updateExperienceField(index, 'company', e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700 mb-1">Job Role</label>
                      <input
                        type="text"
                        placeholder="Job Role"
                        className="input input-bordered w-full bg-gray-100 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200"
                        value={exp.jobRole}
                        onChange={e => updateExperienceField(index, 'jobRole', e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700 mb-1">Job Description</label>
                      <textarea
                        placeholder="Job Description"
                        className="textarea textarea-bordered w-full bg-gray-100 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 h-24"
                        value={exp.jobDescription}
                        onChange={e => updateExperienceField(index, 'jobDescription', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 mt-2"
                  onClick={addExperienceField}
                >
                  + Add Experience
                </button>
              </div>

              {/* Skills, Softskills, Achievements */}
              {['skills', 'softskills', 'achievements'].map(field => (
                <div key={field} className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <label className="text-lg font-semibold text-gray-800 mb-3 capitalize">
                    {field === 'achievements' ? 'My Accomplishments' : field}
                  </label>
                  {form[field].map((item, index) => (
                    <div key={index} className="flex gap-2 mb-2 items-center">
                      {field === 'achievements' ? (
                        <textarea
                          className="textarea textarea-bordered w-full bg-gray-100 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 h-20"
                          value={item}
                          placeholder="Accomplishment"
                          onChange={e => updateFieldArray(field, e.target.value, index)}
                        />
                      ) : (
                        <input
                          type="text"
                          className="input input-bordered w-full bg-gray-100 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200"
                          value={item}
                          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                          onChange={e => updateFieldArray(field, e.target.value, index)}
                        />
                      )}
                      {index > 0 && (
                        <button
                          type="button"
                          className="btn btn-error btn-sm hover:bg-red-600 transition-colors duration-200"
                          onClick={() => removeField(field, index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 mt-2"
                    onClick={() => addField(field)}
                  >
                    + Add
                  </button>
                </div>
              ))}

              {/* Projects */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <label className="text-lg font-semibold text-gray-800 mb-3">Projects</label>
                {form.projects.map((project, index) => (
                  <div key={index} className="border border-gray-200 p-4 mb-3 rounded-md bg-white relative hover:bg-blue-50 transition-colors duration-200">
                    {index > 0 && (
                      <button
                        type="button"
                        className="absolute top-2 right-2 btn btn-error btn-sm hover:bg-red-600 transition-colors duration-200"
                        onClick={() => removeProjectField(index)}
                      >
                        Remove
                      </button>
                    )}
                    {['projectName', 'client', 'teamSize', 'technology'].map(field => (
                      <div key={field} className="flex flex-col mb-2">
                        <label className="text-sm font-medium text-gray-700 mb-1">
                          {field.replace(/([A-Z])/g, ' $1').charAt(0).toUpperCase() + field.replace(/([A-Z])/g, ' $1').slice(1)}
                        </label>
                        <input
                          type={field === 'teamSize' ? 'number' : 'text'}
                          placeholder={field.replace(/([A-Z])/g, ' $1').charAt(0).toUpperCase() + field.replace(/([A-Z])/g, ' $1').slice(1)}
                          className="input input-bordered w-full bg-gray-100 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200"
                          value={project[field]}
                          onChange={e => updateProjectField(index, field, e.target.value)}
                        />
                      </div>
                    ))}
                    <div className="mb-2">
                      <label className="text-sm font-medium text-gray-700 mb-1">Project Description (Points)</label>
                      {Array.isArray(project.description) && project.description.map((point, descIndex) => (
                        <div key={descIndex} className="flex gap-2 items-center mb-2">
                          <textarea
                            className="textarea textarea-bordered w-full bg-gray-100 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 h-16"
                            value={point}
                            placeholder={`Point ${descIndex + 1}`}
                            onChange={e => updateDescriptionPoint(index, descIndex, e.target.value)}
                          />
                          {descIndex > 0 && (
                            <button
                              type="button"
                              className="btn btn-error btn-sm hover:bg-red-600 transition-colors duration-200"
                              onClick={() => removeDescriptionPoint(index, descIndex)}
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 mt-1"
                        onClick={() => addDescriptionPoint(index)}
                      >
                        + Add Point
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 mt-2"
                  onClick={addProjectField}
                >
                  + Add Project
                </button>
              </div>

              {/* Photo Upload */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <label className="text-lg font-semibold text-gray-800 mb-3">Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered w-full bg-gray-100 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200"
                  onChange={handleFileChange}
                />
                {form.photo && (
                  <div className="mt-3">
                    <img src={URL.createObjectURL(form.photo)} alt="Preview" className="w-28 h-28 object-cover rounded-md border border-gray-200 shadow-sm" />
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 justify-center">
                <motion.button
                  type="submit"
                  className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-400"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </motion.button>
                <motion.button
                  type="button"
                  className="px-6 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-700 transition-colors duration-200"
                  onClick={handleCloseModal}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </div>
            </form>
          </motion.div>
        </dialog>
      </AnimatePresence>
    </div>
  );
}

export default Page;