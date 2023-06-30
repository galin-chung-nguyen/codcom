import Link from 'next/link';
import { useSelector } from 'react-redux';
import React, { useRef, useEffect, useState } from 'react';
import img from 'next/image';

// /**
//  * Hook that alerts clicks outside of the passed ref
//  */
// function useOutsideAlerter(ref: any, handleClickOutside: any) {
//   useEffect(() => {
//     /**
//      * Alert if clicked on outside of element
//      */
//     // Bind the event listener
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       // Unbind the event listener on clean up
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [ref]);
// }

const avatarColors = {
  aqua: '#00ffff',
  azure: '#f0ffff',
  beige: '#f5f5dc',
  black: '#000000',
  blue: '#0000ff',
  brown: '#a52a2a',
  cyan: '#00ffff',
  darkblue: '#00008b',
  darkcyan: '#008b8b',
  darkgrey: '#a9a9a9',
  darkgreen: '#006400',
  darkkhaki: '#bdb76b',
  darkmagenta: '#8b008b',
  darkolivegreen: '#556b2f',
  darkorange: '#ff8c00',
  darkorchid: '#9932cc',
  darkred: '#8b0000',
  darksalmon: '#e9967a',
  darkviolet: '#9400d3',
  fuchsia: '#ff00ff',
  gold: '#ffd700',
  green: '#008000',
  indigo: '#4b0082',
  khaki: '#f0e68c',
  lightblue: '#add8e6',
  lightcyan: '#e0ffff',
  lightgreen: '#90ee90',
  lightgrey: '#d3d3d3',
  lightpink: '#ffb6c1',
  lightyellow: '#ffffe0',
  lime: '#00ff00',
  magenta: '#ff00ff',
  maroon: '#800000',
  navy: '#000080',
  olive: '#808000',
  orange: '#ffa500',
  pink: '#ffc0cb',
  purple: '#800080',
  violet: '#800080',
  red: '#ff0000',
  silver: '#c0c0c0',
  white: '#ffffff',
  yellow: '#ffff00',
};

function digestStringIntoColor(x: string): string {
  let sum = 0;
  for (let i = 0; i < x.length; ++i) {
    sum += x.charCodeAt(i);
  }

  sum %= Object.keys(avatarColors).length;
  return (avatarColors as any)[Object.keys(avatarColors)[sum]];
}

export default function NavBar() {
  const user = useSelector((state: any) => state.user);

  return (
    <>
      <nav className="bg-[#fafafa] p-2 fixed w-full z-10 top-0 border-b-2 border-[#f0f0f0]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-7">
              <div>
                <Link href="#">
                  <span className="flex items-center py-4 px-2">
                    <span className="text-[#01884f] text-3xl">#Codecom</span>
                  </span>
                </Link>
              </div>
              <div className="hidden md:flex items-center space-x-1">
                <Link href="/">
                  <span className="py-4 px-2 text-[#01884f] border-b-4 border-[#01884f] font-semibold ">
                    Code comment generator
                  </span>
                </Link>
                <Link href="#">
                  <span className="py-4 px-2 text-gray-500 font-semibold hover:text-[#01884f] transition duration-300">
                    Github
                  </span>
                </Link>
                <Link href="#">
                  <span className="py-4 px-2 text-gray-500 font-semibold hover:text-[#01884f] transition duration-300">
                    About Us
                  </span>
                </Link>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-3 ">
              <div className="relative inline-block text-left">
                <Link href="#login">
                  <span className="py-2 px-2 mr-2 font-medium text-gray-500 rounded hover:bg-[#01884f] hover:text-white transition duration-300">
                    Log In
                  </span>
                </Link>
                <Link href="#signup">
                  <span className="py-2 px-2 font-medium text-white bg-[#01884f] rounded hover:bg-[#01884f] transition duration-300">
                    Sign Up
                  </span>
                </Link>
              </div>
            </div>
            <div className="md:hidden flex items-center">
              <button className="outline-none mobile-menu-button">
                <svg
                  className=" w-6 h-6 text-gray-500 hover:text-[#01884f] "
                  x-show="!showMenu"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="hidden mobile-menu">
          <ul className="">
            <li className="active">
              <Link
                href="index.html"
                className="block text-sm px-2 py-4 text-white bg-[#01884f] font-semibold"
              >
                Code comment generator
              </Link>
            </li>
            <li>
              <Link
                href="#services"
                className="block text-sm px-2 py-4 hover:bg-[#01884f] transition duration-300"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="#about"
                className="block text-sm px-2 py-4 hover:bg-[#01884f] transition duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                className="block text-sm px-2 py-4 hover:bg-[#01884f] transition duration-300"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        {/* <script>
                    const btn = document.querySelector("button.mobile-menu-button");
                    const menu = document.querySelector(".mobile-menu");

				btn.addEventListener("click", () => {
                        menu.classList.toggle("hidden");
				});
            </script> */}
      </nav>
    </>
  );
}
