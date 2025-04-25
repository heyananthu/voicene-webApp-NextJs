import React from 'react'
import logo from '@/public/assets/Logo_Balck.png'
import australia from '@/public/assets/australia.png'
import netherlands from '@/public/assets/netherlands.png'
import usa from '@/public/assets/usa-flag.svg';
import india from '@/public/assets/india-flag.svg'
import Image from 'next/image'

function FooterSection() {
    return (
        <div className='shadow-md'>
            <footer className="mt-auto w-full max-w-[85rem] pt-10 mx-auto bg-white border-t">
                {/* <!-- Grid --> */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10 px-4 sm:px-6 lg:px-8">
                    <div className="col-span-full lg:col-span-1 lg:block">
                        <a className="flex-none text-xl font-semibold" href="#" aria-label="Brand">
                            <Image src={logo} alt='logo' /></a>
                        <p className="mt-3 text-xs sm:text-sm text-gray-600">
                            At Voicene Technologies LLP, we are more than just a software
                            development company; we are your strategic technology partner.
                        </p>
                        <p className="mt-3 text-xs sm:text-sm text-gray-600">© 2024 voicene.</p>
                    </div>
                    <div className="hidden"></div>
                    <div className="ml-10">
                        <h4 className="text-xs font-semibold text-main uppercase text-black">
                            Useful Links
                        </h4>
                        <div className="mt-3 grid space-y-3 text-sm">
                            <p>
                                <a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800" href="https://www.voicene.com/">Home</a>
                            </p>
                            <p>
                                <a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800" href="https://www.voicene.com/about.html">About us</a>
                            </p>
                            <p>
                                <a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800" href="https://www.voicene.com/contactus.html">Contact Us</a>
                            </p>
                            <p>
                                <a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800" href="https://www.voicene.com/openings.html">Careers</a>
                            </p>
                            <p>
                                <a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800" href="#">Sitemap</a>
                            </p>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-xs font-semibold text-main uppercase text-black">
                            Our Services
                        </h4>

                        <div className="mt-3 grid space-y-3 text-sm">
                            <p>
                                <a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800" href="https://www.voicene.com/Itservices.html">IT Services</a>
                            </p>
                            <p>
                                <a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800" href="https://www.voicene.com/itservices/webdevelopmentservice.html">
                                    Web development
                                </a>
                            </p>
                            <p>
                                <a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800" href="https://www.voicene.com/itservices/mobileappdevelopmentservice.html">App Development
                                </a>
                            </p>
                            <p>
                                <a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800" href="https://www.voicene.com/EnterpriseResourcePlanning.html">ERP</a>
                            </p>
                            <p>
                                <a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800" href="https://www.voicene.com/dataserv.html">Data Services</a>
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 col-span-2 sm:col-span-2 align-top gap-5 items-start">
                        <div className="grid">
                            <div className="flex">
                                <Image src={india} alt="india" className="mr-3 w-4" />
                                <h4 className="text-xs font-semibold text-main uppercase text-black">
                                    INDIA
                                </h4>
                            </div>
                            <div className="space-y-3 text-sm p-3">
                                <div className="flex">
                                    <p className="mr-1 text-gray-600">
                                        <svg className="flex-shrink-0 size-4 text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="18"
                                            height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                                            strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                        </svg>
                                    </p>
                                    <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" aria-label="Our address"
                                        title="Our address" className="transition-colors duration-300 text-gray-600 hover:text-gray-500">
                                        TC Nos. 1/3215(1), Block 1, Laham Complex, Asset Orchestra
                                        Road, Kazhakuttam, Trivandrum, Kerala 695582, IN
                                    </a>
                                </div>
                                <div className="flex">
                                    <p className="mr-1 text-gray-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                            stroke="currentColor" className="size-4">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3">
                                            </path>
                                        </svg>
                                    </p>
                                    <a href="tel:9562439181" aria-label="Our phone" title="Our phone"
                                        className="transition-colors duration-300 text-gray-600 hover:text-gray-500">+91 95 624 39181</a>
                                </div>
                            </div>
                        </div>
                        <div className="grid">
                            <div className="flex">
                                <Image src={usa} alt="USA Flag" className="mr-3 w-4" />
                                <h4 className="text-xs font-semibold text-main uppercase text-black">
                                    USA
                                </h4>
                            </div>
                            <div className="space-y-3 text-sm p-3">
                                <div className="flex">
                                    <p className="mr-1 text-gray-600">
                                        <svg className="flex-shrink-0 size-4 text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24"
                                            height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                                            strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                        </svg>
                                    </p>
                                    <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" aria-label="Our address"
                                        title="Our address" className="transition-colors duration-300 text-gray-600 hover:text-gray-500">
                                        1387 S 4th St First floor, Louisville, KY 40208
                                    </a>
                                </div>
                                <div className="flex">
                                    <p className="mr-1 text-gray-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                            stroke="currentColor" className="size-4">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3">
                                            </path>
                                        </svg>
                                    </p>
                                    <a href="tel:9562439181" aria-label="Our phone" title="Our phone"
                                        className="transition-colors duration-300 text-gray-600 hover:text-gray-500">+1 7862992120</a>
                                </div>
                            </div>
                        </div>
                        <div className="grid">
                            <div className="flex">
                                <Image src={netherlands} alt="NETHERLANDS Flag" className="mr-3 w-4" />
                                <h4 className="text-xs font-semibold text-main uppercase text-black">
                                    NETHERLANDS *
                                </h4>
                            </div>
                            <div className="space-y-3 text-sm p-3">
                                <div className="flex">
                                    <p className="mr-1 text-gray-600">
                                        <svg className="flex-shrink-0 size-4 text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24"
                                            height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                                            strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                        </svg>
                                    </p>
                                    <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" aria-label="Our address"
                                        title="Our address" className="transition-colors duration-300 text-gray-600 hover:text-gray-500">
                                        Wilshire Michelangelostraat 21 2 1077 BP Amsterdam!
                                    </a>
                                </div>
                                <div className="flex">
                                    <p className="mr-1 text-gray-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                            stroke="currentColor" className="size-4">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3">
                                            </path>
                                        </svg>
                                    </p>
                                    <a href="tel:9562439181" aria-label="Our phone" title="Our phone"
                                        className="transition-colors duration-300 text-gray-600 hover:text-gray-500">+31 654900233</a>
                                </div>
                            </div>
                        </div>
                        <div className="grid">
                            <div className="flex">
                                <Image src={australia} alt="AUSTRALIA Flag" className="mr-3 w-4" />
                                <h4 className="text-xs font-semibold text-main uppercase text-black">
                                    AUSTRALIA *
                                </h4>
                            </div>
                            <div className="space-y-3 text-sm p-3">
                                <div className="flex">
                                    <p className="mr-1 text-gray-600">
                                        <svg className="flex-shrink-0 size-4 text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24"
                                            height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                                            strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                        </svg>
                                    </p>
                                    <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" aria-label="Our address"
                                        title="Our address" className="transition-colors duration-300 text-gray-600 hover:text-gray-500">
                                        100 Fallon Dr, Dural NSW 2158
                                    </a>
                                </div>
                                <div className="flex">
                                    <p className="mr-1 text-gray-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                            stroke="currentColor" className="size-4">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3">
                                            </path>
                                        </svg>
                                    </p>
                                    <a href="tel:9562439181" aria-label="Our phone" title="Our phone"
                                        className="transition-colors duration-300 text-gray-600 hover:text-gray-500">+61 494166182</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-5 border-gray-200 px-4 sm:px-6 lg:px-8 bg-gray-100/50">
                    <div className="sm:flex sm:justify-between sm:items-center">
                        <div className="flex items-center gap-x-3">
                            {/* <!-- Language Dropdown --> */}
                            <div className="hs-dropdown [--placement:top-left] relative inline-flex">
                                <button id="footer-language-dropdown" type="button"
                                    className="hs-dropdown-toggle py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                                    <svg className="size-3 rounded-full" xmlns="http://www.w3.org/2000/svg" id="flag-icon-css-us1"
                                        viewBox="0 0 512 512">
                                        <g fillRule="evenodd">
                                            <g strokeWidth="1pt">
                                                <path fill="#bd3d44"
                                                    d="M0 0h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z"
                                                    transform="scale(3.9385)" />
                                                <path fill="#fff"
                                                    d="M0 10h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z"
                                                    transform="scale(3.9385)" />
                                            </g>
                                            <path fill="#192f5d" d="M0 0h98.8v70H0z" transform="scale(3.9385)" />
                                            <path fill="#fff"
                                                d="M8.2 3l1 2.8H12L9.7 7.5l.9 2.7-2.4-1.7L6 10.2l.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7L74 8.5l-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 7.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 24.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 21.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 38.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 35.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 52.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 49.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2 .3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 66.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 63.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9z"
                                                transform="scale(3.9385)" />
                                        </g>
                                    </svg>
                                    English (US)
                                    <svg className="hs-dropdown-open:rotate-180 flex-shrink-0 size-4 text-gray-500"
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m18 15-6-6-6 6" />
                                    </svg>
                                </button>
                                <div
                                    className="hs-dropdown-menu w-40 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10 bg-white shadow-md rounded-lg p-2"
                                    aria-labelledby="footer-language-dropdown">
                                    <a className="flex items-center gap-x-2 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100"
                                        href="#">
                                        <svg className="size-3.5 rounded-full" xmlns="http://www.w3.org/2000/svg" id="flag-icon-css-us"
                                            viewBox="0 0 512 512">
                                            <g fillRule="evenodd">
                                                <g strokeWidth="1pt">
                                                    <path fill="#bd3d44"
                                                        d="M0 0h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z"
                                                        transform="scale(3.9385)" />
                                                    <path fill="#fff"
                                                        d="M0 10h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z"
                                                        transform="scale(3.9385)" />
                                                </g>
                                                <path fill="#192f5d" d="M0 0h98.8v70H0z" transform="scale(3.9385)" />
                                                <path fill="#fff"
                                                    d="M8.2 3l1 2.8H12L9.7 7.5l.9 2.7-2.4-1.7L6 10.2l.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7L74 8.5l-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 7.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 24.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 21.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 38.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 35.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 52.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 49.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 66.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 63.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9z"
                                                    transform="scale(3.9385)" />
                                            </g>
                                        </svg>
                                        English (US)
                                    </a>
                                    <a className="flex items-center gap-x-2 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100"
                                        href="#">
                                        <svg className="size-3 rounded-full" xmlns="http://www.w3.org/2000/svg" id="flag-icon-css-de"
                                            viewBox="0 0 512 512">
                                            <path fill="#ffce00" d="M0 341.3h512V512H0z" />
                                            <path d="M0 0h512v170.7H0z" />
                                            <path fill="#d00" d="M0 170.7h512v170.6H0z" />
                                        </svg>
                                        Deutsch
                                    </a>
                                </div>
                            </div>
                            {/* <!-- End Language Dropdown --> */}
                            <div className="space-x-4 text-sm ms-4">
                                <a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800" href="https://www.voicene.com/terms.html">Terms of service</a>
                                <a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800" href="https://www.voicene.com/privacypolicy.html">
                                    Privacy policy</a>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="mt-3 sm:hidden">
                                <p className="mt-1 text-xs sm:text-sm text-gray-600">
                                    © 2024 Voicene.
                                </p>
                            </div>
                            {/* <!-- Social Brands --> */}
                            <div className="space-x-4">
                                <a className="inline-block text-gray-500 hover:text-gray-800"
                                    href="https://www.linkedin.com/company/voicene-technologies-llp/" target="_blank">
                                    <span className="[&>svg]:h-3 [&>svg]:w-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512">
                                            <path
                                                d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                                        </svg>
                                    </span>
                                </a>
                                <a className="inline-block text-gray-500 hover:text-gray-800" href="https://twitter.com/VoiceneLlp"
                                    target="_blank">
                                    <span className="[&>svg]:h-3 [&>svg]:w-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512">
                                            <path
                                                d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                                        </svg>
                                    </span>
                                </a>
                                <a className="inline-block text-gray-500 hover:text-gray-800"
                                    href="https://www.instagram.com/voicenetechnologiesllp/" target="_blank">
                                    <span className="[&>svg]:h-3 [&>svg]:w-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512">
                                            <path
                                                d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                                        </svg>
                                    </span>
                                </a>
                                <a className="inline-block text-gray-500 hover:text-gray-800"
                                    href="https://www.facebook.com/profile.php?id=61550239613420" target="_blank">
                                    <span className="[&>svg]:h-3 [&>svg]:w-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 320 512">
                                            <path
                                                d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                                        </svg>
                                    </span>
                                </a>
                                <a className="inline-block text-gray-500 hover:text-gray-800"
                                    href="https://in.pinterest.com/technologiesvoicene/" target="_blank">
                                    <span className="[&>svg]:h-3 [&>svg]:w-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 496 512">
                                            <path
                                                d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3 .8-3.4 5-20.3 6.9-28.1 .6-2.5 .3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2c-5 21.4-3 51.6-.9 71.2C65.4 450.9 0 361.1 0 256 0 119 111 8 248 8s248 111 248 248z" />
                                        </svg>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    )
}

export default FooterSection
