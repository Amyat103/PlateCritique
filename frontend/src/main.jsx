import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PictureContextProvider from './components/context/PictureContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PictureContextProvider>
      <App />
    </PictureContextProvider>
  </React.StrictMode>
);
