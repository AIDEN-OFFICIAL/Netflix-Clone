import React, { useEffect,useState} from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useParams,useNavigate } from 'react-router-dom'
const Player = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [apiData, setApiData] = useState({
    name: '',
    key: '',
    published_at: '',
    type: '',
  })
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2FiYTUyOGQzYjFmOTcwYTI4ZmQyNWMyMGQwMTVhNSIsIm5iZiI6MTc0NDY0MjM5My4zNjksInN1YiI6IjY3ZmQyMTU5NjFiMWM0YmIzMjk5MzU2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RwO2fkoz92YAJRq1ShnQZ-wG0JPt8WoWUqWrTmAdO_g'
    }
  };
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
    fetch(url, options)
      .then(res => res.json())
      .then(res => {
      if (res.results && res.results.length > 0) {
        setApiData(res.results[0]);
      } else {
        console.warn("No videos found for this movie.");
        setApiData(null); // or set some fallback
      }
    })
    .catch(err => {
      console.error(err);
      setApiData(null);
    });
  }, [id])
  return (
    <div className='player h-[100vh] flex flex-col items-center justify-center bg-black'>
       <img src={back_arrow_icon} className='absolute top-5 left-3 w-13 cursor-pointer' onClick={()=>navigate(-2)}/> 
      <iframe src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameborder="0" allowFullScreen className='w-[90%] h-[90%] rounded-xl '>
      </iframe>
        <div className="player-info flex items-center justify-between w-[90%]">
        <p>{ apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
        </div>
     </div>
   )
}
export default Player;