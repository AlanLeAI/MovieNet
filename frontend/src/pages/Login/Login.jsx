import React from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import {login, signup} from '../../firebase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../../firebase'

function Login(){

  const navigate = useNavigate()

  const [signState, setSignState] = React.useState("Sign In")
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  async function user_auth(event){
    event.preventDefault()
    if(signState === "Sign In"){
      await login(email, password)
    }else{
      await signup(name, email, password)
    }
  }

  async function handleGoogle(event){
    const provider = await new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
  }


  return (
    <div className='login'>
      <img src={logo} className='login-logo' alt="" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState === "Sign Up"? 
          <input value={name} 
            onChange={(event)=>{setName(event.target.value)}} 
            type="text" placeholder='Your name'/>: null}
          
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
          
        </form>
        <button onClick={handleGoogle} className="google-login-button">
            Login with Google
        </button>

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