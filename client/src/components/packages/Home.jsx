import React from 'react'
import island from './assets/island.jpeg'
import pkgs from './assets/pkgs.jpg'
import river2 from './assets/river2.jpg'

import Navbar from '../../components/navbar/Navbar'
import Header from "./Header"
import "./Home.css";
import { useState } from 'react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div
        className="imageContainer"
        style={{
          backgroundImage: `url(/images/kauai-unsplash.jpg)`,
          width: "100vw", // Set your desired width here
          height: "560px", // Set your desired height here
        }}>
        {/* <nav className="flex items-center justify-between flex-wrap bg-gray-200 p-4">
          <div className="flex items-center flex-shrink-0  mr-6">
            <span className="text-xl font-bold tracking-tight text-blue-400">Travelperk</span>
          </div>
          <div className="block md:hidden">
            <button
              id="navbar-toggle"
              className="flex items-center px-3 py-2 border rounded text-gray-700 border-gray-700 hover:text-white hover:border-white"
              onClick={toggleMenu}
            >
              <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          <div
            className={`w-full flex-grow md:flex md:items-center md:w-auto ${isMenuOpen ? 'block' : 'hidden'
              } mt-4 md:mt-0`}
            id="navbar-menu"
          >
            <div className="text-sm md:flex-grow">
              <a href="/" className="block mt-4 md:inline-block md:mt-0 text-gray-700 hover:text-white mr-4">
                Home
              </a>
              <a href="/about" className="block mt-4 md:inline-block md:mt-0 text-gray-700 hover:text-white mr-4">
                Discover
              </a>
              <a href="/services" className="block mt-4 md:inline-block md:mt-0 text-gray-700 hover:text-white mr-4">
                Trips
              </a>
              <a href="/contact" className="block mt-4 md:inline-block md:mt-0 text-gray-700 hover:text-white">
                More
              </a>
            </div>
            <div>
              <a
                href="/contact"
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-gray-700 border-gray-700 hover:text-white hover:border-white mt-4 lg:mt-0 mr-2 lg:mr-4"
              >
                More
              </a>
              <button className="inline-block text-sm px-4 py-2 leading-none border rounded text-gray-700 border-gray-700 hover:text-white hover:border-white mt-4 lg:mt-0">
                Sign In
              </button>
            </div>
          </div>
        </nav> */}
        <Navbar />

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <h1 className="headerTitle">
          Adventure Awaits: Browse Our Premium Packages              </h1>
        <Header />
      </div>
    </>)
}
