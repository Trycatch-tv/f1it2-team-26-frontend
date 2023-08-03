import React from 'react'
import Home from './pages/Home/Home';
import {BrowserRouter as Router,Routes, Route, Navigate } from 'react-router-dom';
import Details from './pages/Details/Details';
import Team from './pages/Team/Team';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' exact   element={<Home/>} />
        <Route path='/details/:id' exact   element={<Details/>} />
        <Route path='/team' exact   element={<Team/>} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
