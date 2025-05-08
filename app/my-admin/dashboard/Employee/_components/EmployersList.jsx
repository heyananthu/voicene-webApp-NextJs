"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';  // Next.js router hook
import Image from 'next/image';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import defaultavatar from '@/public/assets/defaultavatar.png'
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import Loading from '@/public/assets/Loading.json'

function EmployersList() {
    const [employers, setEmployers] = useState([]);
    const [loading, setLoading] = useState(false);

    const router = useRouter();  // Initialize the useRouter hook
    useEffect(() => {
        const adminStatus = localStorage.getItem('admin')
        if (adminStatus !== 'authenticated') {
            router.push('/my-admin')
        }
    }, [router])

    useEffect(() => {
        setLoading(true)
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
        console.log(id)
        try {
            const res = await axios.delete(`/api/employees/${id}`);
            if (res.status == 200) {
                toast.success('Details Deleted...', {
                    position: 'top-center',
                    theme: 'colored',
                    transition: Bounce,
                });
            }
            console.log(res.data)
            setEmployers((prevEmployers) =>
                prevEmployers.filter((emp) => emp._id !== id)
            );

        } catch (error) {
            console.error('Error deleting employer:', error.response?.data?.message || error.message);
        }
    };

    if (loading) return <p className="p-4 text-center">
        <Lottie animationData={Loading} size={30}/>
    </p>;

    return (
        // <div>
        //     <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-5">
        //         {employers.length === 0 ?
        //             <p className='text-center'>No Details Found</p>
        //             :
        //             employers.map((emp) => (
        //                 <div className="m-10 card " key={emp._id}>
        //                     <div className="rounded-lg border bg-white px-4 pt-8 pb-10 shadow-lg">
        //                         <div className="relative mx-auto w-36 rounded-full">
        //                             <span className="absolute right-0 m-3 h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2"></span>
        //                             <Image className="mx-auto h-32 w-32 rounded-full object-cover" src={emp.photo ? `/uploads/${emp.photo}` : 'https://via.placeholder.com/150'} alt="profile" width={160} height={160} />
        //                         </div>
        //                         <h1 className="my-1 text-center text-xl font-bold leading-8 text-gray-900">{emp.name}</h1>
        //                         <h3 className="font-lg text-semibold text-center leading-6 text-gray-600">{emp.position}</h3>

        //                         <ul className="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
        //                             <li className="flex items-center py-3 text-sm">
        //                                 <span>Email</span>
        //                                 <span className="ml-auto"><span className="rounded-full bg-green-200 py-1 px-2 text-xs font-medium text-green-700">{emp.email}</span></span>
        //                             </li>
        //                             <li className="flex items-center py-3 text-sm">
        //                                 <span>Contact</span>
        //                                 <span className="ml-auto">{emp.contact}</span>
        //                             </li>
        //                             <li className="flex items-center py-3 text-sm">
        //                                 <span>Total Experience</span>
        //                                 <span className="ml-auto">{emp.experiences.join(', ')}</span>
        //                             </li>
        //                             <li className="flex items-center py-3 text-sm">
        //                                 <span>Skills</span>
        //                                 <span className="ml-auto">{emp.skills.join(', ')}</span>
        //                             </li>
        //                         </ul>
        //                         <div className="card-actions mt-4 flex justify-center">
        //                             <div className='space-x-3'>
        //                                 <button
        //                                     className="btn btn-success"
        //                                     onClick={() => handleUpdate(emp._id)}
        //                                 >
        //                                     Update
        //                                 </button>
        //                                 <button
        //                                     className="btn btn-error"
        //                                     onClick={() => handleDelete(emp._id)}
        //                                 >
        //                                     Delete
        //                                 </button>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>

        //             ))}
        //     </div>

        //     {/* Update Form Modal */}
        //     {editingEmployer && (
        //         <div className="modal">
        //             <div className="modal-box bg-gray-200">
        //                 <form onSubmit={handleSubmit} className="p-4 space-y-4">
        //                     <input
        //                         type="text"
        //                         placeholder="Name"
        //                         className="p-2 border w-full"
        //                         value={form.name}
        //                         onChange={(e) => setForm({ ...form, name: e.target.value })}
        //                         required
        //                     />
        //                     <input
        //                         type="email"
        //                         placeholder="Email"
        //                         className="p-2 border w-full"
        //                         value={form.email}
        //                         onChange={(e) => setForm({ ...form, email: e.target.value })}
        //                         required
        //                     />
        //                     <input
        //                         type="text"
        //                         placeholder="Contact"
        //                         className="p-2 border w-full"
        //                         value={form.contact}
        //                         onChange={(e) => setForm({ ...form, contact: e.target.value })}
        //                         required
        //                     />
        //                     <input
        //                         type="text"
        //                         placeholder="Position"
        //                         className="p-2 border w-full"
        //                         value={form.position}
        //                         onChange={(e) => setForm({ ...form, position: e.target.value })}
        //                         required
        //                     />

        //                     {/* Dynamic Experiences */}
        //                     <div className="space-y-2">
        //                         <label>Experience</label>
        //                         {form.experiences.map((experience, index) => (
        //                             <input
        //                                 key={index}
        //                                 type="text"
        //                                 placeholder="Experience"
        //                                 className="p-2 border w-full"
        //                                 value={experience}
        //                                 onChange={(e) => handleExperiencesChange(e, index)}
        //                                 required
        //                             />
        //                         ))}
        //                         <button
        //                             type="button"
        //                             className="bg-purple-600 text-white py-1 px-8 hover:scale-105 duration-300 cursor-pointer rounded"
        //                             onClick={addExperienceField}
        //                         >
        //                             Add Experience
        //                         </button>
        //                     </div>

        //                     {/* Dynamic Skills */}
        //                     <div className="space-y-2">
        //                         <label>Skills</label>
        //                         {form.skills.map((skill, index) => (
        //                             <input
        //                                 key={index}
        //                                 type="text"
        //                                 placeholder="Skill"
        //                                 className="p-2 border w-full"
        //                                 value={skill}
        //                                 onChange={(e) => handleSkillsChange(e, index)}
        //                                 required
        //                             />
        //                         ))}
        //                         <button
        //                             type="button"
        //                             className="bg-purple-600 text-white py-1 px-8 hover:scale-105 duration-300 cursor-pointer rounded"
        //                             onClick={addSkillField}
        //                         >
        //                             Add Skill
        //                         </button>
        //                     </div>

        //                     <input
        //                         type="file"
        //                         onChange={handleFileChange}
        //                         className="p-2 border w-full"
        //                     />

        //                     <div className="modal-action">
        //                         <button type="submit" className="bg-purple-600 text-white py-2 px-4 rounded">
        //                             Save Changes
        //                         </button>
        //                         <button
        //                             type="button"
        //                             className="btn"
        //                             onClick={() => setEditingEmployer(null)}  // Close the modal without saving
        //                         >
        //                             Close
        //                         </button>
        //                     </div>
        //                 </form>
        //             </div>
        //         </div>
        //     )}

        //     <ToastContainer />
        // </div>
        <div className='bg-white h-full '>

            <div className="overflow-x-auto text-black">
                <table className="table">
                    {/* head */}
                    <thead className='text-black'>
                        <tr>
                            <th>Name</th>
                            <th>Contact</th>
                            <th>Gender</th>
                            <th>Date of Birth</th>
                            <th>Nationality </th>
                            <th>Language Proficiency</th>
                            <th>Education</th>
                            <th>Skills</th>
                            <th>Soft Skills</th>
                            <th>Experience</th>
                            <th>Projects</th>
                            <th>Achievements</th>

                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {employers.map((item, index) =>

                            <tr className='' key={index}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <Image
                                                    src={item.photo ? `/uploads/${item.photo}` : defaultavatar} alt="profile" width={160} height={160} />

                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{item.name}</div>
                                            <div className="text-sm opacity-50">{item.position}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {item.email}
                                    <br />
                                    <span className="badge badge-ghost badge-sm">{item.contact}</span>
                                </td>

                                <td>{item.gender}</td>
                                <td>{new Date(item.dob).toLocaleDateString()}</td>
                                <td>{item.nationality}</td>
                                <td>{item.language}</td>
                                <td>{item.education.join(', ')}</td>
                                <td>{item.skills.join(', ')}</td>
                                <td>{item.softskills.join(', ')}</td>
                                <td>{item.experiences.join(', ')}</td>
                                <td>{item.projects.join(', ')}</td>
                                <td>{item.achievements.join(', ')}</td>
                                <th>
                                    <button className="btn btn-ghost btn-xs" onClick={() => handleDelete(item._id)}><MdDelete size={20} className='text-red-600' /></button>
                                </th>
                                {/* <th>
                                    <button className="btn btn-ghost btn-xs"><BiEdit size={18} className='text-green-600'/></button>
                                </th> */}
                            </tr>
                        )}


                    </tbody>
                    {/* foot */}
                    {/* <tfoot>
                        <tr>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </tfoot> */}
                </table>
            </div>

        </div>
    );
}

export default EmployersList;
