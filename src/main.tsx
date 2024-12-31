import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';

import './index.css';

import Home from './pages/Home.tsx';
import NotFound from './pages/NotFound.tsx';
import Projects from './pages/Projects.tsx';
import Project from './pages/Project.tsx';
import Blogs from './pages/Blogs.tsx';
import Blog from './pages/Blog.tsx';
import Navbar from './components/Navbar.tsx';

const router = createBrowserRouter([
  { path: '/', element: <Navbar><Home /></Navbar>, errorElement: <Navbar><NotFound /></Navbar> },
  { path: '/home', element: <Navbar><Home /></Navbar> },
  { path: '/projects', element: <Navbar><Projects /></Navbar> },
  { path: '/project/:id', element: <Navbar><Project /></Navbar> },
  { path: '/blogs', element: <Navbar><Blogs /></Navbar> },
  { path: '/blog/:id', element: <Navbar><Blog /></Navbar> },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
