import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import {Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Login from './pages/Login/Login'
import SearchPage from './pages/SearchPage/SearchPage'
import Navbar from './components/Navbar/Navbar'
// import Player from './pages/Player/Player'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MovieDetail from './pages/MovieDetail/MovieDetail'

function App(){
  const location = useLocation();

  return (
    <div className="app-container">
      <ToastContainer theme='dark'/>
      {location.pathname !== '/' && <Navbar />}
      <div className="content-container">
      <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/moviedetail/:id' element={<MovieDetail/>}/>
          <Route path='/search' element={SearchPage}/>
      </Routes>
      </div>
      
    </div>
  )
}

export default App