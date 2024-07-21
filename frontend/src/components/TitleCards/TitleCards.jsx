import React, { useEffect } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";

function TitleCards(props) {
  const [apiData, setApiData] = React.useState([]);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: import.meta.env.VITE_TMDB_API_KEY,
    },
  };
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${props.category ? props.category : "now_playing"}?language=en-US&page=1`,
      options,
    )
      .then((response) => response.json())
      .then((response) => setApiData(response.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="titlecards">
      <h2>{props.title ? props.title : "Popular on MovieNet"}</h2>
      <div className="card-list">
        {apiData.map((card, index) => {
          return (
            <Link
              to={`/moviedetail/${card.id}`}
              className="custom-card"
              key={index}
            >
              <img
                src={"https://image.tmdb.org/t/p/w500" + card.backdrop_path}
                alt={card.name}
              />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default TitleCards;
