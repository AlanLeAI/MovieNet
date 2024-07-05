import React, {useEffect} from 'react'
import './MovieDetail.css'
import { useParams } from 'react-router-dom'
import Player from '../../components/Player/Player'

function MovieDetail(){
    const {id} = useParams()
    const [onplay, setOnplay] = React.useState(false)

    const [apiData, setApiData] = React.useState({})

    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: import.meta.env.VITE_TMDB_API_KEY
        }
    };

    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
        .then(response => response.json())
        .then(response => setApiData(response))
        .catch(err => console.error(err));
    }, [])

    function handleOnPlay(){
        setOnplay(!onplay)
    }

  return (
    <div className='moviedetail'>

        <h2>{apiData.title}</h2>
        <div className='movieinfo'>
            <div className='movieinfo-left'>
                <img src={'https://image.tmdb.org/t/p/w500' + apiData.backdrop_path} alt="" />
            </div>
            <div className='movieinfo-right'>
                <p>{apiData.overview}</p>
                <p>Release Date: {apiData.release_date}</p>
                <p>Genres: {apiData.genres?apiData.genres.map(genre => genre.name).join(', '):null}</p>
                <p>Average Ratings: {apiData.vote_average}/10</p>
                <button className='custom-btn' onClick={handleOnPlay}>Watch</button>
            </div>

        </div>
        {onplay && <Player id = {apiData.id}/>}
       
        
    </div>
  )
}

export default MovieDetail