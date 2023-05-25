import React from 'react'
import Home from './pages/Home/Home';
import {BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Details from './pages/Details/Details';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' exact   element={<Home/>} />
        <Route path='/details/:id' exact   element={<Details/>} />
      </Routes>
    </Router>
  )
}

export default App
