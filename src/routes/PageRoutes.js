import React from 'react'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import SignUp from '../pages/signup/SignUp'
import {Routes, Route, Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import PasswordReset from '../pages/password_reset/PasswordReset'
import Profile from '../pages/profile/Profile'

const PageRoutes = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  return (
    <Routes>
      <Route path='/' element={isLoggedIn ? <Home/> : <Login />} />
      <Route path='/login' element={!isLoggedIn ? <Login/> : <Navigate to="/" />} />
      <Route path='/signup' element={!isLoggedIn ? <SignUp/> : <Navigate to="/" />}  />
      <Route path='/password-reset' element={!isLoggedIn ? <PasswordReset/> : <Navigate to="/" />}  />
      
      <Route path='/profile' element={isLoggedIn ? <Profile/> : <Navigate to="/login" />}  />
    </Routes>
  )
}

export default PageRoutes