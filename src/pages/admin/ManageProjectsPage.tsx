import React from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '../../data/ProjectContext';

const ManageProjectsPage: React.FC = () => {
  const { projects, deleteProject } = useProjects();

  const handleDelete = (slug: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(slug);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-light-gray">Manage Projects</h1>
        <Link
          to="/admin/add-project"
          className="bg-accent-cyan/10 hover:bg-accent-cyan/20 text-accent-cyan font-bold py-2 px-4 rounded"
        >
          Add New Project
        </Link>
      </div>
      <div className="bg-card-blue shadow-md rounded-lg p-8">
        <ul className="space-y-4">
          {projects.map(project => (
            <li key={project.slug} className="flex justify-between items-center bg-space-dark p-4 rounded-md">
              <span className="text-light-gray">{project.title}</span>
              <div>
                <Link to={`/admin/edit-project/${project.slug}`} className="text-accent-cyan mr-4">Edit</Link>
                <button onClick={() => handleDelete(project.slug)} className="text-red-500">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageProjectsPage;
