import React from 'react';
//components
import Header from "./components/Header";
import Footer from "./components/Footer";


//pages
import Home from "./pages/Home";
import RoomDetails from "./pages/RoomDetails";
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
// react router
import {createBrowserRouter, RouterProvider} from "react-router-dom";


const router = createBrowserRouter([
  {
  path: '/',
  element: <Home /> 
  },
  {
    path: '/room/:id',
    element: <RoomDetails />
  },
  {
    path: '/login',
    element: <SignIn />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/contact',
    element: <Contact />
  }
  
]);


const App = () => {
  return <div>
    <Header />
    <RouterProvider router={router}  />
    <Footer />

  </div>;
};

export default App;
