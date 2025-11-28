import React, { useState } from 'react';
import { useProjects } from '../../data/ProjectContext';
import { useNavigate } from 'react-router-dom';

const AddProjectPage: React.FC = () => {
  const { addProject } = useProjects();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [techStack, setTechStack] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProject = {
      title,
      slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
      description,
      longDescription,
      techStack: techStack.split(',').map(tag => tag.trim()),
      githubUrl,
      liveUrl,
      image,
    };

    addProject(newProject);
    alert('Project added successfully! This change is temporary and will be lost on page reload.');
    navigate('/projects');
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-light-gray">Add New Project</h1>
      <div className="bg-card-blue shadow-md rounded-lg p-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-mid-gray text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border border-space-dark bg-space-dark text-light-gray rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-mid-gray text-sm font-bold mb-2" htmlFor="slug">
              Slug (optional)
            </label>
            <input
              id="slug"
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="shadow appearance-none border border-space-dark bg-space-dark text-light-gray rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
             <p className="text-mid-gray text-xs italic">If left blank, the slug will be generated from the title.</p>
          </div>
          <div className="mb-4">
            <label className="block text-mid-gray text-sm font-bold mb-2" htmlFor="description">
              Short Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              value={longDescription}
              onChange={(e) => setLongDescription(e.target.value)}
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
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              className="shadow appearance-none border border-space-dark bg-space-dark text-light-gray rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-mid-gray text-sm font-bold mb-2" htmlFor="githubUrl">
              GitHub URL
            </label>
            <input
              id="githubUrl"
              type="text"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className="shadow appearance-none border border-space-dark bg-space-dark text-light-gray rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-mid-gray text-sm font-bold mb-2" htmlFor="liveUrl">
              Live URL
            </label>
            <input
              id="liveUrl"
              type="text"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              className="shadow appearance-none border border-space-dark bg-space-dark text-light-gray rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label className="block text-mid-gray text-sm font-bold mb-2" htmlFor="image">
              Image URL
            </label>
            <input
              id="image"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="shadow appearance-none border border-space-dark bg-space-dark text-light-gray rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="bg-accent-cyan/10 hover:bg-accent-cyan/20 text-accent-cyan font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Project
            </button>
          </div>
        </form>
      </div>
      <p className="text-center text-mid-gray text-xs mt-4">
        <b>Note:</b> For this demonstration, new projects are stored in-memory and will be lost on page reload. A real application would require a backend database to persist this data.
      </p>
    </div>
  );
};

export default AddProjectPage;
