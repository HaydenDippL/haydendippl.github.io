import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';

import './index.css';

import Layout from './components/Layout.tsx';
import Home from './pages/Home.tsx';
import NotFound from './pages/NotFound.tsx';
import Projects from './pages/Projects.tsx';
import Project from './pages/Project.tsx';
import Blogs from './pages/Blogs.tsx';
import Blog from './pages/Blog.tsx';
import BlogNotFound from './pages/BlogNotFound.tsx';

const router = createBrowserRouter([
  { path: '/', element: <Layout><Home /></Layout>, errorElement: <Layout><NotFound /></Layout> },
  { path: '/home', element: <Layout><Home /></Layout> },
  { path: '/projects', element: <Layout><Projects /></Layout> },
  { path: '/project/:id', element: <Layout><Project /></Layout> },
  { path: '/blogs', element: <Layout><Blogs /></Layout> },
  { path: '/blog/:id', element: <Layout><Blog /></Layout> },
  { path: '/blog/not-found', element: <Layout><BlogNotFound /></Layout>}
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
