import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import Header from './components/Header';
import Search from './pages/Search';
import About from './pages/About';
import Upload from './pages/Upload';
import Faq from './pages/Faq';
import Profile from './pages/Profile';

const App = () => {
  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/faq' element={<Faq/>} />
          <Route path='/profile' element={<Profile/>} />
          {/* <Route path='/login' element={<Home/>} /> */}
          {/* <Route path='/signup' element={<Home/>} /> */}
          <Route path='/upload' element={<Upload/>} />
          <Route path='/search' element={<Search/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App;





