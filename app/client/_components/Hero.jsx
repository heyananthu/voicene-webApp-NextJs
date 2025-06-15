"use client"

import React, { useEffect, useState, useRef } from 'react';

const slides = [
    {
        bg: "url('assets/banner1.jpg')",
        align: "flex-row",
        textAlign: "text-left",
        content: (
            <>
                <span className="block text-gray-100">Voicene Technologies LLP</span>
                <h1 className="text-xl md:text-6xl font-bold text-white my-5">
                    AI-Powered Business Solutions
                </h1>
                <span className="block text-gray-100 text-xl">
                    Elevate your business with our AI-powered solutions. Let's discuss how AI can drive your growth.
                </span>
                <a
                    href="https://www.voicene.com/contactus.html"
                    className="flex items-center text-white border border-white py-2 px-5 w-[10rem] gap-2 rounded"
                >
                    <span>Get Started</span>
                    <svg className="w-4" fill="none" stroke="currentColor" strokeLinecap="round"
                        strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </a>
            </>
        ),
    },
    {
        bg: "url('assets/banner2.jpg')",
        align: "flex-col items-end text-right",
        content: (
            <>
                <span className="block text-gray-100">Voicene Technologies LLP</span>
                <h2 className="text-xl md:text-6xl font-bold text-white my-5 md:max-w-lg">
                    Comprehensive ERP Services
                </h2>
                <span className="block text-gray-100 text-xl md:max-w-lg">
                    Experience comprehensive ERP services designed for growth. Contact us to see how we can help!
                </span>
                <div className='flex justify-end'>
                    <a
                        href="https://www.voicene.com/contactus.html"
                        className="flex items-center text-white border border-white py-2 px-5 w-[10rem] gap-2 rounded"
                    >
                        <span>Get Started</span>
                        <svg className="w-4" fill="none" stroke="currentColor" strokeLinecap="round"
                            strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a></div>
            </>
        ),
    },
    {
        bg: "url('assets/banner3.jpg')",
        align: "flex-col items-end text-right",
        content: (
            <>
                <span className="block text-gray-100">Voicene Technologies LLP</span>
                <h2 className="text-xl md:text-6xl font-bold text-white my-5 md:max-w-lg">
                    Integrated SAP Solutions
                </h2>
                <span className="block text-gray-100 text-xl md:max-w-lg">
                    Achieve seamless integration across your enterprise with SAP. Reach out for a personalized consultation!
                </span>
                <div className='flex justify-end'>
                    <a
                        href="https://www.voicene.com/contactus.html"
                        className="flex items-center text-white border border-white py-2 px-5 w-[10rem] gap-2 rounded"
                    >
                        <span>Get Started</span>
                        <svg className="w-4" fill="none" stroke="currentColor" strokeLinecap="round"
                            strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a></div>
            </>
        ),
    },
    {
        bg: "url('assets/banner4.jpg')",
        align: "flex-col text-left",
        content: (
            <>
                <span className="block text-gray-100">Voicene Technologies LLP</span>
                <h2 className="text-xl md:text-6xl font-bold text-white my-5">
                    Custom Web & Mobile Development
                </h2>
                <span className="block text-gray-100 text-xl">
                    Get tailored web and mobile solutions that fit your unique needs. Schedule a consultation with us now!
                </span>
                <div className='flex '>
                    <a
                        href="https://www.voicene.com/contactus.html"
                        className="flex items-center text-white border border-white py-2 px-5 w-[10rem] gap-2 rounded"
                    >
                        <span>Get Started</span>
                        <svg className="w-4" fill="none" stroke="currentColor" strokeLinecap="round"
                            strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a></div>
            </>
        ),
    },
    {
        bg: "url('assets/banner5.jpg')",
        align: "flex-col items-center text-center",
        content: (
            <>
                <span className="block text-gray-100">Voicene Technologies LLP</span>
                <h2 className="text-xl md:text-6xl font-bold text-white my-5">
                    Advanced Analytics & Data Science
                </h2>
                <span className="block text-gray-100 text-xl">
                    Gain competitive advantage through advanced analytics and data science. Contact us to discuss your project!
                </span>
                <div className='flex justify-center'>
                    <a
                        href="https://www.voicene.com/contactus.html"
                        className="flex items-center text-white border border-white py-2 px-5 w-[10rem] gap-2 rounded"
                    >
                        <span>Get Started</span>
                        <svg className="w-4" fill="none" stroke="currentColor" strokeLinecap="round"
                            strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a></div>
            </>
        ),
    },
];

const Hero = () => {
    const [index, setIndex] = useState(0);
    const timeoutRef = useRef(null);

    const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

    useEffect(() => {
        timeoutRef.current = setTimeout(nextSlide, 4000);
        return () => clearTimeout(timeoutRef.current);
    }, [index]);

    return (
        <div className="relative w-full overflow-hidden">
            <div className="relative h-[30rem] md:h-[calc(100vh-106px)] bg-gray-100 rounded-b-2xl">
                <div
                    className="flex transition-transform duration-700"
                    style={{ transform: `translateX(-${index * 100}%)` }}
                >
                    {slides.map((slide, i) => (
                        <div
                            key={i}
                            className="w-full flex-shrink-0 h-[30rem] md:h-[calc(100vh-106px)]"
                        >
                            <div
                                className={`w-full h-full flex ${slide.align} bg-cover bg-no-repeat bg-right`}
                                style={{ backgroundImage: slide.bg }}
                            >
                                <div
                                    className={`my-auto w-3/4 md:max-w-xl space-y-5 px-5 md:px-10 ${slide.textAlign}`}
                                >
                                    {slide.content}

                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute inset-y-0 left-0 w-12 text-black hover:bg-white/20 flex justify-center items-center focus:outline-none"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M11.354 1.646a.5.5 0 010 .708L5.707 8l5.647 5.646a.5.5 0 11-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z" />
                    </svg>
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute inset-y-0 right-0 w-12 text-black hover:bg-white/20 flex justify-center items-center focus:outline-none"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M4.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 11-.708-.708L10.293 8 4.646 2.354a.5.5 0 010-.708z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Hero;
