import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import Header from './components/Header';

const App = () => {
  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
          {/* <Route path='/about' element={<Home/>} />
          <Route path='/faq' element={<Home/>} />
          <Route path='/profile' element={<Home/>} />
          <Route path='/login' element={<Home/>} />
          <Route path='/signup' element={<Home/>} />
          <Route path='/upload' element={<Home/>} />
          <Route path='/search' element={<Home/>} /> */}
        </Routes>
      </Router>
    </>
  )
}

export default App;
