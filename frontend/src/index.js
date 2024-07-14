import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Carousel from './components/Carousel';
import { AppProvider } from './AppContext';

const appStyle = {
  backgroundImage: `url(${"app/background.jpg"})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
};

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([{
    path: "/",
    element: <Home />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/showroom",
    element: <Carousel />
  }])

root.render(
  <React.StrictMode>
    <AppProvider>
      <div style={appStyle}>
        <RouterProvider router={router} />
      </div>
    </AppProvider>
  </React.StrictMode>
);
