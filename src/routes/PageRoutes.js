import React from 'react'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import SignUp from '../pages/signup/SignUp'
import {Routes, Route, Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux'

const PageRoutes = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={!isLoggedIn ? <Login/> : <Navigate to="/" />} />
      <Route path='/signup' element={!isLoggedIn ? <SignUp/> : <Navigate to="/" />}  />
    </Routes>
  )
}

export default PageRoutes