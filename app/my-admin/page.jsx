
"use client"

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify'


function Login() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const loginHandler = (e) => {
    e.preventDefault();

    if (name === "admin" && password === "1234") {

      localStorage.setItem("admin", "authenticated")
      console.log(localStorage.getItem("admin"))

      toast.success('Welcome Admin', {
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

      setTimeout(() => {
        router.push('/my-admin/dashboard/Employee')
      }, 1000)


    } else {
      toast.error('Failed', {
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

    }
  }
  return (
    <div className='h-screen flex justify-center items-center'>
      <div>
        <fieldset className="fieldset bg-white  shadow-md rounded-box w-[25rem] border py-12 px-4 ">
          <h1 className='text-center font-bold text-2xl text-black'>Admin Login</h1>

          <label className="label">Username</label>
          <input type="name" className="py-3 p-3 bg-gray-100 rounded-md text-black" placeholder="username"
            value={name}
            onChange={(e) => { setName(e.target.value) }}
          />

          <label className="label">Password</label>
          <input type="password" className="py-3 p-3 bg-gray-100 rounded-md text-black" placeholder="Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
          />

          <button className="btn btn-primary  mt-4" onClick={loginHandler}>Login</button>
        </fieldset>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </div>

  )
}

export default Login
