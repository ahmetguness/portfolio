import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import BlogPage from './pages/BlogPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import BlogDetailPage from './pages/BlogDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import ScrollToTop from './utils/ScrollToTop';

import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminLayout from './layouts/AdminLayout';

import ProtectedRoute from './components/ProtectedRoute';

import AddBlogPage from './pages/admin/AddBlogPage';

import AddProjectPage from './pages/admin/AddProjectPage';

import EditAboutPage from './pages/admin/EditAboutPage';

import EditHeroPage from './pages/admin/EditHeroPage';

import EditProjectsSectionPage from './pages/admin/EditProjectsSectionPage';

import EditBlogSectionPage from './pages/admin/EditBlogSectionPage';

import EditContactSectionPage from './pages/admin/EditContactSectionPage';

import ManageBlogPage from './pages/admin/ManageBlogPage';

import EditBlogPage from './pages/admin/EditBlogPage';

import ManageProjectsPage from './pages/admin/ManageProjectsPage';

import EditProjectPage from './pages/admin/EditProjectPage';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:slug" element={<ProjectDetailPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminLoginPage />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="add-blog"
            element={
              <ProtectedRoute>
                <AddBlogPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="manage-blog"
            element={
              <ProtectedRoute>
                <ManageBlogPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="edit-blog/:slug"
            element={
              <ProtectedRoute>
                <EditBlogPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="add-project"
            element={
              <ProtectedRoute>
                <AddProjectPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="manage-projects"
            element={
              <ProtectedRoute>
                <ManageProjectsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="edit-project/:slug"
            element={
              <ProtectedRoute>
                <EditProjectPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="edit-about"
            element={
              <ProtectedRoute>
                <EditAboutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="edit-hero"
            element={
              <ProtectedRoute>
                <EditHeroPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="edit-projects-section"
            element={
              <ProtectedRoute>
                <EditProjectsSectionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="edit-blog-section"
            element={
              <ProtectedRoute>
                <EditBlogSectionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="edit-contact-section"
            element={
              <ProtectedRoute>
                <EditContactSectionPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;