'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import EmployersList from './_components/EmployersList';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdDelete } from "react-icons/md";


function Page() {
  const router = useRouter();
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(false);


  // Updated state for education & experience
  const [form, setForm] = useState({
    name: '',
    email: '',
    contact: '',
    experiences: [
      { company: '', jobRole: '', jobDescription: '' }
    ],
    position: '',
    totalexperience: '',
    skills: [''],
    projects: [
      {
        projectName: '',
        client: '',
        teamSize: '',
        technology: '',
        description: ['']
      }
    ],
    softskills: [''],
    education: [
      { school: '', course: '', year: '' }
    ],
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

  // For simple array fields (skills, softskills, achievements)
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

  // For project subfields
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

  // EDUCATION handlers
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

  // EXPERIENCE handlers
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

    // Filter arrays
    const filteredArrays = {};
    ['skills', 'softskills', 'achievements'].forEach((field) => {
      filteredArrays[field] = form[field].map(item => item.trim()).filter(Boolean);
    });

    // Filter projects: remove empty ones
    const filteredProjects = form.projects.filter(
      p =>
        p.projectName.trim() ||
        p.client.trim() ||
        p.teamSize.trim() ||
        p.technology.trim() ||
        (Array.isArray(p.description) ? p.description.some(d => d.trim()) : false)
    );

    // Filter education and experience: remove empty entries
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

    // Send projects, education, experiences as JSON string
    formData.append('projects', JSON.stringify(filteredProjects));
    formData.append('education', JSON.stringify(filteredEducation));
    formData.append('experiences', JSON.stringify(filteredExperiences));

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
        toast.success('New Details Added');
        await fetchEmployers();
        setIsSubmitting(false);
        handleCloseModal();

        setForm({
          name: '',
          email: '',
          contact: '',
          experiences: [{ company: '', jobRole: '', jobDescription: '' }],
          position: '',
          totalexperience: '',
          skills: [''],
          projects: [
            {
              projectName: '',
              client: '',
              teamSize: '',
              technology: '',
              description: ['']
            }
          ],
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

  // Project description handlers
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

  // Place this handler in your component:
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
    <div className="w-full bg-white min-h-screen mt-20 px-4 relative" suppressHydrationWarning>
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

      <div className="flex justify-end mb-4">
        <button
          className="bg-purple-600 py-2 px-5 text-white rounded-md hover:scale-105 transition"
          onClick={() => document.getElementById('my_modal_1').showModal()}
        >
          Create +
        </button>
      </div>

      <EmployersList employers={employers} setEmployers={setEmployers} loading={loading} error={error} />

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

            {/* Education Section */}
            {/* Education Section */}
            <div>
              <label className="font-semibold">Education</label>
              {form.education.map((edu, index) => (
                <div key={index} className="mb-2 p-6 bg-slate-50 rounded relative">
                  {index > 0 && (
                    <button
                      type="button"
                      className="absolute top-1 right-1 text-red-600 cursor-pointer"
                      onClick={() => {
                        const updated = [...form.education];
                        updated.splice(index, 1);
                        setForm({ ...form, education: updated });
                      }}
                    >
                      <MdDelete size={20} />
                    </button>
                  )}
                  <input
                    type="text"
                    placeholder="School/College"
                    className="input input-bordered w-full mb-1 bg-slate-300"
                    value={edu.school}
                    onChange={e => updateEducationField(index, 'school', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Course"
                    className="input input-bordered w-full mb-1 bg-slate-300"
                    value={edu.course}
                    onChange={e => updateEducationField(index, 'course', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Year of Passing"
                    className="input input-bordered w-full mb-1 bg-slate-300"
                    value={edu.year}
                    onChange={e => updateEducationField(index, 'year', e.target.value)}
                  />
                </div>
              ))}
              <button
                type="button"
                className="btn btn-sm mt-2 bg-purple-600 text-white"
                onClick={addEducationField}
              >
                + Add Education
              </button>
            </div>

            {/* Experience Section */}
            <div className=''>
              <label className="font-semibold">Experience</label>
              {form.experiences.map((exp, index) => (
                <div key={index} className="mb-2 p-6 bg-slate-50 rounded relative">
                  {index > 0 && (
                    <button
                      type="button"
                      className="absolute top-1 right-1 text-red-600  cursor-pointer"
                      onClick={() => {
                        const updated = [...form.experiences];
                        updated.splice(index, 1);
                        setForm({ ...form, experiences: updated });
                      }}
                    >
                      <MdDelete size={20} />
                    </button>
                  )}
                  <input
                    type="text"
                    placeholder="Company"
                    className="input input-bordered w-full mb-1 bg-slate-300"
                    value={exp.company}
                    onChange={e => updateExperienceField(index, 'company', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Job Role"
                    className="input input-bordered w-full mb-1 bg-slate-300"
                    value={exp.jobRole}
                    onChange={e => updateExperienceField(index, 'jobRole', e.target.value)}
                  />
                  <textarea
                    placeholder="Job Description"
                    className="input input-bordered w-full h-24 mb-1 bg-slate-300"
                    value={exp.jobDescription}
                    onChange={e => updateExperienceField(index, 'jobDescription', e.target.value)}
                  />
                </div>
              ))}
              <button
                type="button"
                className="btn btn-sm mt-2 bg-purple-600 text-white"
                onClick={addExperienceField}
              >
                + Add Experience
              </button>
            </div>

            {/* Dynamic fields (skills, softskills, achievements) */}
            {['skills', 'softskills', 'achievements'].map((field) => (
              <div key={field}>
                <label className="font-semibold capitalize">
                  {field === 'achievements' ? 'My Accomplishments' : field}
                </label>
                {form[field].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 mb-1">
                    {field === 'achievements' ? (
                      <textarea
                        placeholder={field === 'achievements' ? 'Accomplishment' : field}
                        className="input input-bordered w-full bg-slate-50 h-20"
                        value={item}
                        onChange={(e) => updateFieldArray(field, e.target.value, index)}
                      />
                    ) : (
                      <input
                        type="text"
                        placeholder={field}
                        className="input input-bordered w-full bg-slate-50"
                        value={item}
                        onChange={(e) => updateFieldArray(field, e.target.value, index)}
                      />
                    )}
                    {index > 0 && (
                      <button
                        type="button"
                        className="btn btn-error btn-xs"
                        onClick={() => {
                          const updated = [...form[field]];
                          updated.splice(index, 1);
                          setForm({ ...form, [field]: updated });
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
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
                <div key={index} className="border py-10 p-3 mb-2 rounded bg-slate-50 relative">
                  {index > 0 && (
                    <button
                      type="button"
                      className="absolute top-2 right-2 btn btn-error btn-xs"
                      onClick={() => removeProjectField(index)}
                    >
                      Remove
                    </button>
                  )}
                  <input
                    type="text"
                    placeholder="Project Name"
                    className="input input-bordered w-full mb-1 bg-slate-300"
                    value={project.projectName}
                    onChange={e => updateProjectField(index, 'projectName', e.target.value)}
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
                  <div className="mb-2">
                    <label className="font-semibold">Project Description (Points)</label>
                    {Array.isArray(project.description) &&
                      project.description.map((point, descIndex) => (
                        <div key={descIndex} className="flex gap-2 items-center mb-1">
                          <textarea
                            className="input input-bordered w-full bg-slate-300 h-16"
                            value={point}
                            placeholder={`Point ${descIndex + 1}`}
                            onChange={e =>
                              updateDescriptionPoint(index, descIndex, e.target.value)
                            }
                          />
                          {descIndex > 0 && (
                            <button
                              type="button"
                              className="btn btn-error btn-xs"
                              onClick={() => removeDescriptionPoint(index, descIndex)}
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                    <button
                      type="button"
                      className="btn btn-primary btn-sm mt-1"
                      onClick={() => addDescriptionPoint(index)}
                    >
                      + Add Point
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-sm mt-2 bg-purple-600 text-white"
                onClick={addProjectField} // <--- Use the handler directly
              >
                + Add Project
              </button>
            </div>


            {/* Projects with subfields */}
            {/* <div>
              <label className="font-semibold">Projects</label>
              {form.projects.map((project, index) => (
                <div key={index} className="border py-10 p-3 mb-2 rounded bg-slate-50 relative">
                  {index > 0 && (
                    <button
                      type="button"
                      className="absolute top-2 right-2 btn btn-error btn-xs"
                      onClick={() => {
                        const updated = [...form.projects];
                        updated.splice(index, 1);
                        setForm({ ...form, projects: updated });
                      }}
                    >
                      Remove
                    </button>
                  )}
                  <input
                    type="text"
                    placeholder="Project Name"
                    className="input input-bordered w-full mb-1 bg-slate-300"
                    value={project.projectName}
                    onChange={e => updateProjectField(index, 'projectName', e.target.value)}
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
                  <div className="mb-2">
                    <label className="font-semibold">Project Description (Points)</label>
                    {Array.isArray(project.description) &&
                      project.description.map((point, descIndex) => (
                        <div key={descIndex} className="flex gap-2 items-center mb-1">
                          <textarea
                            className="input input-bordered w-full bg-slate-300 h-16"
                            value={point}
                            placeholder={`Point ${descIndex + 1}`}
                            onChange={e =>
                              updateDescriptionPoint(index, descIndex, e.target.value)
                            }
                          />
                          {descIndex > 0 && (
                            <button
                              type="button"
                              className="btn btn-error btn-xs"
                              onClick={() => removeDescriptionPoint(index, descIndex)}
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                    <button
                      type="button"
                      className="btn btn-primary btn-sm mt-1"
                      onClick={() => addDescriptionPoint(index)}
                    >
                      + Add Point
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-sm mt-2 bg-purple-600 text-white"
                onClick={addProjectField}
              >
                + Add Project
              </button>
            </div> */}



            {/* Photo upload */}
            <div>
              <label className="font-semibold">Photo</label>
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full bg-slate-300"
                onChange={handleFileChange}
              />
            </div>

            <div className="flex gap-2 justify-center">
              <button
                type="submit"
                className="px-3 py-2 rounded-md  bg-purple-600 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
              <button
                type="button"
                className="px-3 py-2 rounded-md  bg-gray-600 text-white"
                onClick={handleCloseModal}
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
