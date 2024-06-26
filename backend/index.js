import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt"
import cors from "cors";
import fetch from "node-fetch";

// import session from "express-session";
// import passport from "passport";
// import GoogleStrategy from "passport-google-oauth2"


const app = express();
const port = 3000;
const saltRound = 10;


const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "movienet",
  password: "19072001",
  port: 5432
})
db.connect()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const TMDB_API_KEY = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOGUwY2JiM2Y0ZDRhZTE5YWFmNGJiZjRiNWE5NjU1ZiIsInN1YiI6IjYzMDFlMDg0YzJmNDRiMDA3YTI5MzJhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DcZfy-xDrNc97d1bzIDOtrbjhhdNx5HUoGOSM3XHk9I';


app.get('/search', async (req, res) => {
  const query = req.query.query;
  const url = `https://api.themoviedb.org/3/search/collection?query=${query}&language=en-US&page=1`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: TMDB_API_KEY,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data)
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data from TMDB:', error);
    res.status(500).send('Server error');
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
