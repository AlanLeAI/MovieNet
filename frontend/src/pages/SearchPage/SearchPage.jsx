import './SearchPage.css'
import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import {Link} from 'react-router-dom'

function SearchPage(){
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };

    const query = useQuery().get('query');
    const [movies, setMovies] = useState([]);
    
    useEffect(() => {
        if (query) {
            fetch(`http://localhost:3000/search?query=${query}`)
                .then(response => response.json())
                .then(data => {setMovies(data);})
                .catch(error => console.error('Error fetching search results:', error));
        }
    }, [query]);

    
    return (
        <div className='titlecards'>
            <div className='card-list-search'>
                {movies.map((movie,index) => (
                    <div key={movie.id}>
                        <Link to={`/moviedetail/${movie.id}`} className='card' key={index}>
                            <img src={'https://image.tmdb.org/t/p/w500'+movie.backdrop_path} alt={movie.name} />
                            <p>{movie.original_title}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )

}


export default SearchPage