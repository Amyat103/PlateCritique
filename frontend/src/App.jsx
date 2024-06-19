import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PictureForm from './components/PictureForm';

import Home from './components/Home';
import Navbar from './components/Narbar';

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/post' element={<PictureForm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
