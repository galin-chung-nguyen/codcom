import Link from 'next/link';
import React from 'react';

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

// const avatarColors = {
//   aqua: '#00ffff',
//   azure: '#f0ffff',
//   beige: '#f5f5dc',
//   black: '#000000',
//   blue: '#0000ff',
//   brown: '#a52a2a',
//   cyan: '#00ffff',
//   darkblue: '#00008b',
//   darkcyan: '#008b8b',
//   darkgrey: '#a9a9a9',
//   darkgreen: '#006400',
//   darkkhaki: '#bdb76b',
//   darkmagenta: '#8b008b',
//   darkolivegreen: '#556b2f',
//   darkorange: '#ff8c00',
//   darkorchid: '#9932cc',
//   darkred: '#8b0000',
//   darksalmon: '#e9967a',
//   darkviolet: '#9400d3',
//   fuchsia: '#ff00ff',
//   gold: '#ffd700',
//   green: '#008000',
//   indigo: '#4b0082',
//   khaki: '#f0e68c',
//   lightblue: '#add8e6',
//   lightcyan: '#e0ffff',
//   lightgreen: '#90ee90',
//   lightgrey: '#d3d3d3',
//   lightpink: '#ffb6c1',
//   lightyellow: '#ffffe0',
//   lime: '#00ff00',
//   magenta: '#ff00ff',
//   maroon: '#800000',
//   navy: '#000080',
//   olive: '#808000',
//   orange: '#ffa500',
//   pink: '#ffc0cb',
//   purple: '#800080',
//   violet: '#800080',
//   red: '#ff0000',
//   silver: '#c0c0c0',
//   white: '#ffffff',
//   yellow: '#ffff00',
// };

// function digestStringIntoColor(x: string): string {
//   let sum = 0;
//   for (let i = 0; i < x.length; ++i) {
//     sum += x.charCodeAt(i);
//   }

//   sum %= Object.keys(avatarColors).length;
//   return (avatarColors as any)[Object.keys(avatarColors)[sum]];
// }

export default function NavBar() {
  // const user = useSelector((state: any) => state.user);

  return (
    <nav className="fixed top-0 z-10 w-full border-b-2 border-[#f0f0f0] bg-[#fafafa] p-2">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link href="#">
                <span className="flex items-center px-2 py-4">
                  <span className="text-3xl text-[#01884f]">#Codecom</span>
                </span>
              </Link>
            </div>
            <div className="hidden items-center space-x-1 md:flex">
              <Link href="/">
                <span className="border-b-4 border-[#01884f] px-2 py-4 font-semibold text-[#01884f] ">
                  Code comment generator
                </span>
              </Link>
              <Link href="#">
                <span className="px-2 py-4 font-semibold text-gray-500 transition duration-300 hover:text-[#01884f]">
                  Github
                </span>
              </Link>
              <Link href="#">
                <span className="px-2 py-4 font-semibold text-gray-500 transition duration-300 hover:text-[#01884f]">
                  About Us
                </span>
              </Link>
            </div>
          </div>
          <div className="hidden items-center space-x-3 md:flex ">
            <div className="relative inline-block text-left">
              <Link href="#login">
                <span className="mr-2 rounded p-2 font-medium text-gray-500 transition duration-300 hover:bg-[#01884f] hover:text-white">
                  Log In
                </span>
              </Link>
              <Link href="#signup">
                <span className="rounded bg-[#01884f] p-2 font-medium text-white transition duration-300 hover:bg-[#01884f]">
                  Sign Up
                </span>
              </Link>
            </div>
          </div>
          <div className="flex items-center md:hidden">
            <button className="mobile-menu-button outline-none">
              <svg
                className=" h-6 w-6 text-gray-500 hover:text-[#01884f] "
                // x-show="!showMenu"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="mobile-menu hidden">
        <ul className="">
          <li className="active">
            <Link
              href="index.html"
              className="block bg-[#01884f] px-2 py-4 text-sm font-semibold text-white"
            >
              Code comment generator
            </Link>
          </li>
          <li>
            <Link
              href="#services"
              className="block px-2 py-4 text-sm transition duration-300 hover:bg-[#01884f]"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="#about"
              className="block px-2 py-4 text-sm transition duration-300 hover:bg-[#01884f]"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              className="block px-2 py-4 text-sm transition duration-300 hover:bg-[#01884f]"
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
  );
}
