import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PictureForm from './components/PictureForm';
import PictureContextProvider from './components/context/PictureContext';

import Home from './components/Home';
import Navbar from './components/Narbar';

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <PictureContextProvider>
          <Navbar />
          <div className='pages'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/post' element={<PictureForm />} />
              <Route path='/post/:id' element={<PictureForm />} />
            </Routes>
          </div>
        </PictureContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
