"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Animatedcard from '@/components/ui/Animationcard'
import Image from "next/image";
function Ourteam() {
    const [data, setData] = useState([]);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true); // ✅ prevent SSR mismatch
        axios.get("/api/employees").then((res) => {
            setData(res.data.employers || []);
            console.log(res.data.employers)
        });
    }, []);

    //  Avoid rendering on server
    if (!hasMounted) return null;

    return (
        <div className="mb-12 px-4 flex flex-col items-center gap-8 max-w-screen-xl mx-auto p-4 ">
            <Animatedcard>

            <h1 className="text-center font-normal text-6xl mb-10 text-gray-600">Our Team</h1>
            </Animatedcard>
            <div className="flex flex-wrap justify-center gap-8">
                {data.map((obj, index) => (
                    <Animatedcard key={index} index={index}>
                        <div className="card bg-white w-80 h-[23rem] shadow-md  shadow-emerald-100">
                            <figure className="px-10 pt-10">
                                <Image
                                    src={obj.photo ? `/uploads/${obj.photo}` : 'https://via.placeholder.com/150'}
                                    alt={obj.name}
                                    className="rounded-full w-40 h-40 object-cover"
                                    width={160}
                                    height={160}
                                />
                            </figure>
                            <div className="card-body items-center text-center space-y-1">
                                <h2 className="card-title text-3xl font-poppins text-black">{obj.name}</h2>
                                <p className="text-gray-600 font-medium">{obj.position}</p>
                                <p className="text-sm text-gray-500">{obj.experiences.join(', ')}</p>
                                <p className="text-sm text-gray-500">{obj.skills.join(', ')}</p>
                            </div>
                        </div>
                    </Animatedcard>
                ))}
            </div>
        </div>

    );
}

export default Ourteam;
