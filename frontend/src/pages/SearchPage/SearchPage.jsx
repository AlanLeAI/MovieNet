import './SearchPage.css'
import React from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom';

function SearchPage(){
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };

    const query = useQuery().get('query');
    
    return (
        <div>
            <h1>Search Results for {query} </h1>
        </div>
    )

}


export default SearchPage