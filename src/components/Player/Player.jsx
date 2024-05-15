import React, { useEffect } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

function Player(props){
  const navigate = useNavigate()

  const [apiData, setApiData] = React.useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2JjMGUxNDc0MmQxYjk1NTNkZWEzYzFlNzNiYjI1ZSIsInN1YiI6IjY2NDRhOThiZGNhMGZhNTQ2NTgyYTc0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jrPb6GT0x5g4agi5DMwpSonnkesPpDrGn2PS016LknQ'
    }
  };

  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${props.id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results[0]))
    .catch(err => console.error(err));
  }, [])
  
  
  return (
    <div>
      {apiData?<div className='player'>
        <iframe width='90%' height='90%' 
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title='trailer'></iframe>

        <div className="player-info">
          <p>{apiData.published_at.slice(0,10)}</p>
          <p>{apiData.name}</p>
          <p>{apiData.type}</p>
        </div>
      </div>: "There is no video"}
      
    </div>
  )
}

export default Player