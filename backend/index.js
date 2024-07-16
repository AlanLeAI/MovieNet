import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors";
import fetch from "node-fetch";
import env from "dotenv";

const app = express();
const port = 3000;
env.config();

const db = new pg.Client({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});
db.connect();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const TMDB_API_KEY = process.env.TMDB_API_KEY;

app.get("/search", async (req, res) => {
  const query = req.query.query;
  let allMovies = [];
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: TMDB_API_KEY,
    },
  };

  try {
    for (let page = 1; page <= 5; page++) {
      const url = `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=${page}`;
      const response = await fetch(url, options);
      const data = await response.json();
      const filteredData = data.results.filter(
        (movie) => movie.backdrop_path !== null
      );
      allMovies = allMovies.concat(filteredData);
    }
    res.status(200).json(allMovies);
  } catch (error) {
    console.error("Error fetching data from TMDB:", error);
    res.status(500).send("Server error");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
