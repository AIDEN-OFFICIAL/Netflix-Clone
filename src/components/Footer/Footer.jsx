import React from 'react'
import './Footer.css'
import youtube_icon from '/youtube_icon.png'
import facebook_icon from '/facebook_icon.png'
import instagram_icon from '/instagram_icon.png'
import twitter_icon from '/twitter_icon.png'
 const Footer = () => {
  return (
    <div className='footer py-8 px-[4%] mx-auto my-0 max-w-5xl'>
      <div className="footer-icons flex gap-5 my-10 mx-0">
        <img src={ youtube_icon} className='cursor-pointer w-8'/>
        <img src={ facebook_icon} className='cursor-pointer w-8' />
        <img src={ instagram_icon} className='cursor-pointer w-8' />
        <img src={ twitter_icon}  className='cursor-pointer w-8'/>
      </div>
      <div className="footer-links ">
        <ul className='grid [grid-template-columns:auto_auto_auto_auto] gap-4 mb-8 '>
        <li className='cursor-pointer'>Audio and Subtitles</li>
        <li className='cursor-pointer'>Help Center</li>
        <li className='cursor-pointer'>Gift Cards</li>
        <li className='cursor-pointer'>Media Center</li>
        <li className='cursor-pointer'>Investor Relations</li>
        <li className='cursor-pointer'>Jobs</li>
        <li className='cursor-pointer'>Terms of Use</li>
        <li className='cursor-pointer'>Privacy</li>
        <li className='cursor-pointer'>Legal Notices</li>
        <li className='cursor-pointer'>Cookie Preferences</li>
        <li className='cursor-pointer'>Corporate Information</li>
        <li className='cursor-pointer'>Contact Us</li>
        </ul>
      </div>
      <div className="footer-copyright  text-gray-400 text-sm">
          <p>© 1997 - 2025 Netflix, Inc.</p>
      </div>
    </div>
  )
}
export default Footer;