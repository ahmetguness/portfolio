import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Resume from "./pages/Resume";
import Project from "./pages/Projects";
import Blog from "./pages/Blog";
import PublicLayout from "./layout/PublicLayout";

// Admin Imports
import { AuthProvider } from "./admin/context/AuthContext";
import { RequireAdmin } from "./admin/context/RequireAdmin";
import AdminLayout from "./admin/layout/AdminLayout";
import Login from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import AdminBlogs from "./admin/pages/Blogs";
import AdminProjects from "./admin/pages/Projects";
import ResumeSettings from "./admin/pages/ResumeSettings";


function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />

        <Route path="/admin" element={
          <RequireAdmin>
            <AdminLayout />
          </RequireAdmin>
        }>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="resume" element={<ResumeSettings />} />

        </Route>

        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Project" element={<Project />} />
          <Route path="/Resume" element={<Resume />} />
          <Route path="/Blog" element={<Blog />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
