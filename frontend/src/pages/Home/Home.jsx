import React from "react";
import "./Home.css";
import popcorn from "../../assets/movienet-background.png";
import hero_title from "../../assets/hero_title.png";
import TitleCards from "../../components/TitleCards/TitleCards";
import Footer from "../../components/Footer/Footer";

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <img src={popcorn} alt="" className="banner-img" />
        <div className="hero-caption">
          <img src={hero_title} alt="" className="caption-img" />
          <p>
            Three irreverent rebels plan to exact revenge against a common enemy
            on a dark, stormy night in the fall of 1987. As their relationships
            unravel, a strange, mysterious sound draws them toward nearby woods.
          </p>
          <TitleCards />
        </div>
      </div>

      <div className="more-cards">
        <TitleCards title={"Blockbuster Movies"} category={"top_rated"} />
        <TitleCards title={"Only on MovieNet"} category={"popular"} />
        <TitleCards title={"Upcoming"} category={"upcoming"} />
        <TitleCards title={"Top picks for you"} category={"now_playing"} />
      </div>

      <Footer />
    </div>
  );
}

export default Home;
