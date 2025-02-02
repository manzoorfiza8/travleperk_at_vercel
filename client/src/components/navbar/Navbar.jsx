import "./navbar.css";
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    console.log(user);
  },[])
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <nav class="bg-white border-gray-200 py-2.5 sm:px-[12%]">
      <div class="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
        <Link to="#" class="flex items-center">
          <span class="self-center text-xl font-bold whitespace-nowrap dark:text-black">Travelperk</span>
        </Link>
        <div class="flex items-center lg:order-2">
          <div class="hidden mt-2 mr-4 sm:inline-block">
            <span></span>
          </div>
          {user && 
          <Link to="/profile"
            class="text-white bg-blue-300 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-blue-400 dark:hover:bg-blue-500 focus:outline-none">
              Profile
          </Link>
          }
          <button onClick={toggleMobileMenu}
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-blue-500 rounded-lg lg:hidden focus:outline-none focus:ring-2 focus:ring-blue-200 dark:text-blue-400 dark:focus:ring-blue-600 hover:bg-white border border-blue-200 "
            aria-controls="mobile-menu-2"
            aria-expanded={isMobileMenuOpen ? 'true' : 'false'}>
            <span class="sr-only">Open main menu</span>
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"></path>
            </svg>
            <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} items-center text-center justify-between w-full lg:flex lg:w-auto lg:order-1`}
          id="mobile-menu-2">
          <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li>
              <Link to="/"
                class="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-gray-900 dark:hover:bg-blue-300 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                aria-current="page">Home</Link>
            </li>
            <li>
              <Link to="/ContactForm"
                class="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-gray-900 dark:hover:bg-blue-300 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Contact</Link>
            </li>
            <li>
              <Link to="/ReviewForm"
                class="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-gray-900 dark:hover:bg-blue-300 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Review</Link>
            </li>
            <li>
              <Link to="/Landing"
                class="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-gray-900 dark:hover:bg-blue-300 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Packages</Link>
            </li>
            <li>
              <Link to="/register"
                class="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-gray-900 dark:hover:bg-blue-300 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Register</Link>
            </li>
            <li>
              <Link to="/login"
                class="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-gray-900 dark:hover:bg-blue-300 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
