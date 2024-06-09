import React from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GoogleLogin } from '@react-oauth/google';


function Login(){

  const navigate = useNavigate()

  const [signState, setSignState] = React.useState("Sign In")
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  async function signup(name, email,password){
    try {
      const response = await axios.post('http://localhost:3000/register', {name: name, email: email, password: password});
      if (response.data.status === "authorized"){
        navigate('/home')
      }else{
        toast(response.data.message)
      }
    } catch (error) {
      console.error('Error registering user:', error);
      toast(error.code)
    }
  }

  async function login(email, password){
    try{
      const response = await axios.post('http://localhost:3000/login', {email: email, password: password});
      
      if (response.data.status === "authorized"){
        navigate('/home')
      }else{
        toast(response.data.message)
      }
    }catch(error){
      toast(error.code)
    }
  }

  async function user_auth(event){
    event.preventDefault()
    if(signState === "Sign In"){
      await login(email, password)
    }else{
      await signup(name, email, password)
    }
  }

  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
      console.log(error);
  };



  return (
    <div className='login'>
      <img src={logo} className='login-logo' alt="" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState === "Sign Up"? 
          <input value={name} onChange={(event)=>{setName(event.target.value)}} type="text" placeholder='Your name'/>: null}
          
          <input value={email} onChange={(event)=>{
            setEmail(event.target.value)
          }}  type="email" placeholder='Email'/>
          <input value={password} onChange={(event)=>{
            setPassword(event.target.value)
          }} type="password" placeholder='Password'/>
          <button onClick={user_auth} type='submit'>{signState}</button>
          <div className='form-help'>
            <div className='remember'>
                <input type="checkbox" />
                <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
          <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        </form>

        <div className='form-switch'>
          {signState === "Sign In"?<p>New To Netflix? <span onClick={()=>{
            setSignState("Sign Up")
          }}>Sign Up Now</span></p>: <p>Already have account? <span onClick={()=>{
            setSignState("Sign In")
          }}>Sign In Now</span></p>}
          
        </div>
      </div>
    </div>
  )
}

export default Login