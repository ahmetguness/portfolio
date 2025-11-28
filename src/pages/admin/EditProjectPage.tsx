import React, { useState, useEffect } from 'react';
import { useProjects } from '../../data/ProjectContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Project } from '../../data/projects';

const EditProjectPage: React.FC = () => {
  const { projects, updateProject } = useProjects();
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const projectToEdit = projects.find(p => p.slug === slug);
    if (projectToEdit) {
      setProject(projectToEdit);
    }
  }, [slug, projects]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (project) {
      const { name, value } = e.target;
      setProject({
        ...project,
        [name]: value,
      });
    }
  };

  const handleTechStackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (project) {
      setProject({
        ...project,
        techStack: e.target.value.split(',').map(tag => tag.trim()),
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (project && slug) {
      updateProject(slug, project);
      alert('Project updated successfully! This change is temporary and will be lost on page reload.');
      navigate('/admin/manage-projects');
    }
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-light-gray">Edit Project</h1>
      <div className="bg-card-blue shadow-md rounded-lg p-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-mid-gray text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={project.title}
              onChange={handleChange}
              className="shadow appearance-none border border-space-dark bg-space-dark text-light-gray rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-mid-gray text-sm font-bold mb-2" htmlFor="slug">
              Slug
            </label>
            <input
              id="slug"
              name="slug"
              type="text"
              value={project.slug}
              onChange={handleChange}
              className="shadow appearance-none border border-space-dark bg-space-dark text-light-gray rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-mid-gray text-sm font-bold mb-2" htmlFor="description">
              Short Description
            </label>
            <textarea
              id="description"
              name="description"
              value={project.description}
              onChange={handleChange}
              className="shadow appearance-none border border-space-dark bg-space-dark text-light-gray rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline h-24"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-mid-gray text-sm font-bold mb-2" htmlFor="longDescription">
              Long Description (Markdown)
            </label>
            <textarea
              id="longDescription"
              name="longDescription"
              value={project.longDescription}
              onChange={handleChange}
              className="shadow appearance-none border border-space-dark bg-space-dark text-light-gray rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline h-48"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-mid-gray text-sm font-bold mb-2" htmlFor="techStack">
              Tech Stack (comma-separated)
            </label>
            <input
              id="techStack"
              type="text"
              value={project.techStack.join(', ')}
              onChange={handleTechStackChange}
              className="shadow appearance-none border border-space-dark bg-space-dark text-light-gray rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-mid-gray text-sm font-bold mb-2" htmlFor="githubUrl">
              GitHub URL
            </label>
            <input
              id="githubUrl"
              name="githubUrl"
              type="text"
              value={project.githubUrl}
              onChange={handleChange}
              className="shadow appearance-none border border-space-dark bg-space-dark text-light-gray rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-mid-gray text-sm font-bold mb-2" htmlFor="liveUrl">
              Live URL
            </label>
            <input
              id="liveUrl"
              name="liveUrl"
              type="text"
              value={project.liveUrl}
              onChange={handleChange}
              className="shadow appearance-none border border-space-dark bg-space-dark text-light-gray rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label className="block text-mid-gray text-sm font-bold mb-2" htmlFor="image">
              Image URL
            </label>
            <input
              id="image"
              name="image"
              type="text"
              value={project.image}
              onChange={handleChange}
              className="shadow appearance-none border border-space-dark bg-space-dark text-light-gray rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="bg-accent-cyan/10 hover:bg-accent-cyan/20 text-accent-cyan font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProjectPage;
