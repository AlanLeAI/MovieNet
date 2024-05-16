import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt"
import cors from "cors";


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


app.post("/register", async (req, res) => {
  const email = req.body.email
  const name = req.body.name
  const password = req.body.password
  // console.log(email)
  try{
    const checkResult = await db.query(
      "select email from users where email = $1",
      [email]
    )
    if (checkResult.rows.length !== 0) {
      res.status(200).json({message: "User already registered.", status: "unauthorized"})
    }else{
      // Pasword Hashing
      bcrypt.hash(password, saltRound, async (err, hash)=>{
        if(err){
          console.log("Error Hashing:", err)
        }
        else{
          const result = await db.query(
            "Insert into users (name, email, password) values ($1, $2, $3)",
            [name, email, hash]
          )
          res.status(200).json({message: "User sucessfully registered.", status: "authorized"})
        }
      })
      
    }
  }
  catch(err){
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.email
  const loginPassword = req.body.password
  try{
    const result = await db.query(
      "select * from users where email = $1",
      [email]
    )
    if(result.rows.length > 0){
      const user = result.rows[0].email
      const storedHashedPassword = result.rows[0].password
      bcrypt.compare(loginPassword, storedHashedPassword, (err,result)=>{
        if(err){
          console.log(err)
          res.status(404).send("Can not hash password!")
        }else{
          if(result){
            res.status(200).json({message: "Successfully logged in", status:"authorized"})
          }else{
            res.status(200).json({message: "Password Incorrect!", status:"unauthorized"})
          }
        }
      })
    }else{
      res.status(200).json({message: "User not found.", status: "unauthorized"})
    }
  }catch(err){
    console.log(err)
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
