import React, { useEffect, useRef, useState } from 'react'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_icon from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import menu_icon from '../../assets/menu_icon.svg' // Add a hamburger icon to your assets
import { logout } from '../../../firebase'

const Navbar = ({ onNavClick }) => {
  const navRef = useRef();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 140) {
        navRef.current.classList.add('bg-[#141414]', 'bg-opacity-70', 'shadow-lg')
      } else {
        navRef.current.classList.remove('bg-[#141414]', 'bg-opacity-70', 'shadow-lg')
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const navLinks = (
    <ul className='flex flex-col md:flex-row gap-5'>
      <li onClick={() => onNavClick('blockbuster')} className='hover:text-gray-400 cursor-pointer'>Home</li>
      <li onClick={() => onNavClick('popular')} className='hover:text-gray-400 cursor-pointer'>TV Shows</li>
      <li onClick={() => onNavClick('upcoming')} className='hover:text-gray-400 cursor-pointer'>Movies</li>
      <li onClick={() => onNavClick('onlyOnNetflix')} className='hover:text-gray-400 cursor-pointer'>New & Popular</li>
      <li onClick={() => onNavClick('topPics')} className='hover:text-gray-400 cursor-pointer'>My List</li>
      <li onClick={() => onNavClick('popular')} className='hover:text-gray-400 cursor-pointer'>Browse by languages</li>
    </ul>
  );

  return (
    <div ref={navRef} className='w-full py-3 px-4 md:px-18 flex justify-between fixed text-sm text-[#e5e5e5] bg-gradient-to-b from-[rgba(0,0,0,0.7)] to-transparent z-10'>
      <div className='flex items-center gap-4 md:gap-12'>
        <img src={logo} className='w-15 md:w-28' alt='Netflix Logo' />
        <div className='hidden md:block'>{navLinks}</div>
        <button className='md:hidden ml-2' onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <img src={menu_icon} alt='Menu' className='w-7' />
        </button>
      </div>
      <div className='flex items-center gap-2 md:gap-5'>
        <img src={search_icon} alt='Search' className='w-4 sm:w-5 cursor-pointer' />
        <p className='cursor-pointer hidden sm:block'>Children</p>
        <img src={bell_icon} alt='Notifications' className='w-4 sm:w-5 cursor-pointer' />
        <div className='navbar-profile group relative flex items-center gap-2'>
          <img src={profile_icon} alt='Profile' className='w-5 sm:w-8 rounded cursor-pointer' />
          <img src={caret_icon} alt='Menu' className='w-2 sm:w-4 cursor-pointer' />
          <div className='dropdown hidden group-hover:block absolute top-[100%] right-0 bg-[#191919] text-sm cursor-pointer w-max py-4 px-2 underline z-10 rounded shadow-lg'>
            <p onClick={() => logout()}>Sign Out of Netflix </p>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className='absolute top-full left-3 p-2 w-40 bg-[#141414] bg-opacity-95 shadow-lg md:hidden'>
          {navLinks}
        </div>
      )}
    </div>
  )
}

export default Navbar
