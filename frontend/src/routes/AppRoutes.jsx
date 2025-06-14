import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home'
import Login from '../pages/Login';
import Register from '../pages/Register';
import DashBoard from '../pages/DashBoard';
import Project from '../pages/Project';

const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={ <Home />} />
            <Route path='/login' element={ <Login /> } />
            <Route path='/register' element={ <Register /> } />
            <Route path='/dashboard' element={ <DashBoard /> } />
            <Route path='/project' element={ <Project/> } />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes