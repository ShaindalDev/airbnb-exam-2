import React from 'react';
import Navbar from './components/layout/Nav';
import Footer from './components/layout/Footer';
import { Routes, Route } from "react-router-dom";
import Layout from './components/layout/Layout';
import HomePage from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />}/>
      </Route>
    </Routes>
  );
}

export default App;



