import React, { useEffect } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data' 
import {Link} from 'react-router-dom'



function TitleCards(props){
  // const cardsRef = React.useRef()

  // function handleWheel(event){
  //   event.preventDefault()
  //   cardsRef.current.scrollLeft += event.deltaY
  // }

  // useEffect(()=>{
  //   cardsRef.current.addEventListener('wheel', handleWheel)
  // }, [])
  const [apiData, setApiData] = React.useState([])

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOGUwY2JiM2Y0ZDRhZTE5YWFmNGJiZjRiNWE5NjU1ZiIsInN1YiI6IjYzMDFlMDg0YzJmNDRiMDA3YTI5MzJhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DcZfy-xDrNc97d1bzIDOtrbjhhdNx5HUoGOSM3XHk9I'
    }
  };
  
  fetch(`https://api.themoviedb.org/3/movie/${props.category? props.category: "now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));

  return (
    <div className='titlecards'>
      <h2>{props.title ? props.title: "Popular on Netflix"}</h2>
      <div className='card-list'>
        {apiData.map((card, index)=>{
          return(
            <Link to={`/moviedetail/${card.id}`} className='card' key={index}>
              <img src={'https://image.tmdb.org/t/p/w500'+card.backdrop_path} alt={card.name} />
              <p>{card.original_title}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default TitleCards

