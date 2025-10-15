import React, { useEffect, useRef } from 'react'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_icon from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import { logout } from '../../../firebase'

const Navbar = () => {
  const navRef = useRef();
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
  return (
    <div ref={navRef} className='  w-full sm:py-5 sm:px-[4%] md:px-18 md:py-3 flex justify-between fixed text-sm text-[#e5e5e5] bg-gradient-to-b from-[rgba(0,0,0,7)] to-transparent z-10'>
      <div className='flex items-center gap-12'>
        <img src={logo} className='w-28 ' alt='Netflix Logo' />
        <ul className='hidden md:flex gap-5'>
          <li className='hover:text-gray-400    M00 cursor-pointer'>Home</li>
          <li className='hover:text-gray-400 cursor-pointer'>TV Shows</li>
          <li className='hover:text-gray-400 cursor-pointer'>Movies</li>
          <li className='hover:text-gray-400 cursor-pointer'>New & Popular</li>
          <li className='hover:text-gray-400 cursor-pointer'>My List</li>
          <li className='hover:text-gray-400 cursor-pointer'>Browse by languages</li>
        </ul>
      </div>
      <div className='flex items-center sm:gap-3 md:gap-5'>
        <img src={search_icon} alt='Search' className='w-5 cursor-pointer' />
        <p className='cursor-pointer'>Children</p>
        <img src={bell_icon} alt='Notifications' className='w-5 cursor-pointer' />
        <div className='navbar-profile group relative flex items-center gap-2'>
        <img src={profile_icon} alt='Profile' className='w-8 rounded cursor-pointer relative ' />
        <img src={caret_icon} alt='Menu' className='w-4 cursor-pointer ' />
          <div className='dropdown hidden group-hover:block absolute top-[100%] right-0 bg-[#191919] text-sm cursor-pointer  w-max py-4 px-2 underline z-10  rounded shadow-lg'>
          <p onClick={()=>logout()}>Sign Out of Netflix </p>
      </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
