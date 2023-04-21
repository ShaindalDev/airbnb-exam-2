import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import VenueProvider from './context/VenueContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <VenueProvider>
    <React.StrictMode>
      
      <App />
      
    </React.StrictMode>
    </VenueProvider>
);
