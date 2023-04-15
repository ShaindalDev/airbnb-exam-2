import React from 'react';
import Navbar from './components/layout/Nav';
import Footer from './components/layout/Footer';
import { Routes, Route } from "react-router-dom";
import Layout from './components/layout/Layout';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Footer />
    </div>
  );
}

export default App;
