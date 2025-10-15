import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';

// import cards_data from '../../../public/cards/Cards_data'
const Titlecards = ({title,category}) => {
  const cardsRef = useRef();
  const [apiData,setApiData] = useState([]);
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2FiYTUyOGQzYjFmOTcwYTI4ZmQyNWMyMGQwMTVhNSIsIm5iZiI6MTc0NDY0MjM5My4zNjksInN1YiI6IjY3ZmQyMTU5NjFiMWM0YmIzMjk5MzU2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RwO2fkoz92YAJRq1ShnQZ-wG0JPt8WoWUqWrTmAdO_g'
  }
};


  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${(category)?category:'popular'}?language=en-US &with_origin_country_=JP`;
    // const url = `https://api.themoviedb.org/3/discover/tv?with_genres=16&with_origin_country=JP`;
    fetch(url, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));
  
    const handleScroll = (event) => {
      event.preventDefault();
      cardsRef.current.scrollLeft += event.deltaY;
    };

    const cardList = cardsRef.current;
    cardList.addEventListener('wheel', handleScroll, { passive: false });

    return () => {
      cardList.removeEventListener('wheel', handleScroll);
    };
  }, [category]);
  return (
    <div className='titlecards mt-13 mb-8'>
      <h2 className='mb-2 font-bold'>{ title}</h2>
      
      <div className='card-list flex gap-3 overflow-x-scroll no-scrollbar' ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={`/player/${card.id}`} key={index} className='card relative flex-shrink-0 '>
            <img src={'https://image.tmdb.org/t/p/w500/'+card.poster_path} alt={card.original_title} className='card_img cursor-pointer rounded w-60 h-35  object-cover' />
            <p className='card_name  absolute bottom-2 right-2 '>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
export default Titlecards