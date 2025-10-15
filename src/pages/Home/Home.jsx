import React, { useRef } from 'react'
import hero_banner from '/hero_banner.jpg'
// import hero from '/background_banner.jpg'
import play_icon from '/play_icon.png'
import more_info_icon from '/info_icon.png'
import hero_title  from '/hero_title.png'
import './Home.css'
import  Navbar  from '../../components/Navbar/Navbar'
import  Titlecards  from '../../components/TitleCards/Titlecards'
import Footer from '../../components/Footer/Footer'
import { signOut } from 'firebase/auth'
signOut
const Home = () => {
  // Create refs for each section
  const popularRef = useRef(null);
  const blockbusterRef = useRef(null);
  const onlyOnNetflixRef = useRef(null);
  const upcomingRef = useRef(null);
  const topPicsRef = useRef(null);

  // Function to handle scroll
  const handleNavScroll = (section) => {
    if (section === 'popular' && popularRef.current) popularRef.current.scrollIntoView({ behavior: 'smooth' });
    if (section === 'blockbuster' && blockbusterRef.current) blockbusterRef.current.scrollIntoView({ behavior: 'smooth' });
    if (section === 'onlyOnNetflix' && onlyOnNetflixRef.current) onlyOnNetflixRef.current.scrollIntoView({ behavior: 'smooth' });
    if (section === 'upcoming' && upcomingRef.current) upcomingRef.current.scrollIntoView({ behavior: 'smooth' });
    if (section === 'topPics' && topPicsRef.current) topPicsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='home'>
      <Navbar onNavClick={handleNavScroll} />
      <div className='hero relative'>
        <img src={hero_banner} alt='' className='banner-img w-full h-auto' />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/100"></div>
        <div className="hero-caption absolute bottom-0 sm:pl-[4%] md:pl-18 w-full top-49 px-4 sm:px-0">
          <img src={hero_title} alt='' className='caption-img sm:w-[35%] md:w-[90%] max-w-[420px] mb-7 mx-auto sm:mx-0' />
          <p className='max-w-175 text-sm mb-5 text-center sm:text-left mx-auto sm:mx-0'>
            Discovering his ties to a secret ancient order, a young man living in modern Istanbul <br />embarks on an epic adventure to save the city.
          </p>
          <div className="hero_btns flex flex-col sm:flex-row text-black gap-3 mb-12 h-10 items-center sm:items-start">
            <button className='btn-play bg-white px-5 py-2 inline-flex items-center gap-3 font-[500] cursor-pointer rounded hover:bg-[#ffffffbf]'>
              <img src={play_icon} alt='' className='w-6' />Play
            </button>
            <button className='btn-more text-white bg-[#6d6d6eb3] px-5 py-2 inline-flex items-center gap-3 font-[500] cursor-pointer rounded hover:bg-[#6d6d6e66]'>
              <img src={more_info_icon} className='w-6' alt='' /> More Info
            </button>
          </div>
          <div className="hidden lg:block py-6" ref={popularRef}>
            <Titlecards title='Popular on Netflix' category={'popular'} />
          </div>
        </div>
      </div>
      <div className="more-cards pl-4 sm:pl-18">
        <div ref={blockbusterRef}>
          <Titlecards title='Blockbuster Movies' category={'top_rated'} />
        </div>
        <div ref={onlyOnNetflixRef}>
          <Titlecards title='Only on Netflix' category={'popular'} />
        </div>
        <div ref={upcomingRef}>
          <Titlecards title='Upcoming' category={'upcoming'} />
        </div>
        <div ref={topPicsRef}>
          <Titlecards title='Top Pics for You' category={'now_playing'} />
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default Home