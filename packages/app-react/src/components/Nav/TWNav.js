import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function TWNav() {
    const [isMobileLinksOpen, setIsMobileLinksOpen] = useState(false);

    return (
        <header className="px-8 py-4 bg-purple-900 text-gray-400">
            <nav>
                <div className="flex items-center justify-between">
                    <div>
                        <Link to="/">
                            <div className="flex flex-col items-end">
                                <h3 className="text-3xl font-bold uppercase hover:text-white">
                                    Orion
                                </h3>
                                <div className="-mt-1 -mr-2 px-2 text-lg text-white font-semibold bg-purple-400 rounded-full">
                                    labs
                                </div>
                            </div>
                        </Link>
                    </div>
                    {/* The button svg (menu or 'x') that is displayed on small screens */}
                    <button
                        className="focus:text-gray-100 hover:text-gray-100 sm:hidden"
                        type="button"
                        onClick={() => setIsMobileLinksOpen(!isMobileLinksOpen)}
                    >
                        <svg
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-8 h-8 fill-current"
                        >
                            {isMobileLinksOpen ? (
                                // The 'X' svg
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            ) : (
                                // The 'menu' svg
                                <path
                                    fillRule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                ></path>
                            )}
                        </svg>
                    </button>
                    {/* The nav links that are displayed on larger screens */}
                    <div className="hidden sm:block flex items-center text-xl">
                        <NavLink
                            to="/login"
                            className="mr-6 p-2 hover:text-white"
                            activeClassName="border-purple-400 border-b-2 text-white font-semibold"
                        >
                            Login
                        </NavLink>

                        <NavLink
                            to="/signup"
                            className="pb-2 hover:text-white"
                            activeClassName="border-purple-400 border-b-2 text-white font-semibold"
                        >
                            Signup
                        </NavLink>
                    </div>
                </div>
                {/* The nav links on small screens that are displayed when the button is clicked */}
                <div className={`${isMobileLinksOpen ? 'block' : 'hidden'} mt-4 -ml-2`}>
                    <NavLink
                        to="/login"
                        activeClassName="bg-purple-800 text-gray-100"
                        className="block px-2 py-1 font-semibold rounded hover:bg-purple-800 hover:text-gray-100"
                    >
                        Login
                    </NavLink>
                    <NavLink
                        to="/signup"
                        activeClassName="bg-purple-800 text-gray-100"
                        className="block px-2 py-1 mt-1 font-semibold rounded hover:bg-purple-800 hover:text-gray-100"
                    >
                        Signup
                    </NavLink>
                </div>
            </nav>
        </header>
    );
}

export default TWNav;
