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

const router = createBrowserRouter([
  { path: '/', element: <Home />, errorElement: <NotFound /> },
  { path: '/home', element: <Home /> },
  { path: '/projects', element: <Projects /> },
  { path: '/project/:id', element: <Project />},
  { path: '/blogs', element: <Blogs /> },
  { path: '/blog/:id', element: <Blog /> },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
