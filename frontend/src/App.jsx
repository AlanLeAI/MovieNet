import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import {Routes, Route, useNavigate} from 'react-router-dom'
import Login from './pages/Login/Login'
// import Player from './pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MovieDetail from './pages/MovieDetail/MovieDetail'

function App(){

  return (
    <div>
      <ToastContainer theme='dark'/>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/moviedetail/:id' element={<MovieDetail/>}/>
      </Routes>
    </div>
  )
}

export default App