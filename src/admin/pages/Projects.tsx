import React, { useEffect, useState } from 'react';
import { projectService } from '../services/projectService';
import { Project } from '../types';
import { MdEdit, MdDelete, MdAdd } from 'react-icons/md';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<Project>>({});

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const data = await projectService.list();
    setProjects(data);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await projectService.remove(id);
      loadProjects();
    }
  };

  const handleEdit = (project: Project) => {
    setCurrentProject(project);
    setIsEditing(true);
  };

  const handleCreate = () => {
    setCurrentProject({ featured: false, techTags: [] });
    setIsEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentProject.id) {
      await projectService.update(currentProject.id, currentProject);
    } else {
      await projectService.create(currentProject as Project);
    }
    setIsEditing(false);
    loadProjects();
  };

  if (isEditing) {
    return (
      <div>
        <div className="admin-header">
          <h2>{currentProject.id ? 'Edit Project' : 'New Project'}</h2>
          <button onClick={() => setIsEditing(false)} className="admin-btn">Cancel</button>
        </div>
        <div className="admin-card">
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
              <label>Title <span style={{color: 'red'}}>*</span></label>
              <input
                value={currentProject.title || ''}
                onChange={e => setCurrentProject({ ...currentProject, title: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Short Description</label>
              <textarea
                value={currentProject.shortDescription || ''}
                onChange={e => setCurrentProject({ ...currentProject, shortDescription: e.target.value })}
                rows={3}
              />
            </div>

            <div className="form-group">
              <label>Image URL</label>
              <input
                value={currentProject.image || ''}
                onChange={e => setCurrentProject({ ...currentProject, image: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <div className="form-group">
              <label>Tech Tags (comma separated)</label>
              <input
                value={currentProject.techTags?.join(', ') || ''}
                onChange={e => setCurrentProject({ ...currentProject, techTags: e.target.value.split(',').map(s => s.trim()) })}
                placeholder="React, TypeScript, Node.js"
              />
            </div>

             <div className="form-group">
              <label>Github URL <span style={{color: 'red'}}>*</span></label>
              <input
                value={currentProject.githubUrl || ''}
                onChange={e => setCurrentProject({ ...currentProject, githubUrl: e.target.value })}
                required
              />
            </div>

             <div className="form-group">
              <label>Live URL</label>
              <input
                value={currentProject.liveUrl || ''}
                onChange={e => setCurrentProject({ ...currentProject, liveUrl: e.target.value })}
              />
            </div>

            <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center' }}>
                <input 
                    type="checkbox" 
                    checked={currentProject.featured || false} 
                    onChange={e => setCurrentProject({ ...currentProject, featured: e.target.checked })}
                    style={{ width: 'auto' }}
                />
                <label>Featured Project?</label>
            </div>

            <button type="submit" className="admin-btn btn-primary">Save Project</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="admin-header">
        <h2>Projects</h2>
        <button onClick={handleCreate} className="admin-btn btn-primary"><MdAdd /> New Project</button>
      </div>
      <div className="admin-card" style={{ overflowX: 'auto'}}>
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: '80px'}}>Image</th>
              <th>Title</th>
              <th>Tags</th>
              <th>Links</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.id}>
                <td>
                    {project.image && <img src={project.image} alt="thumb" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />}
                </td>
                <td>
                    <div style={{ fontWeight: 600 }}>{project.title}</div>
                    {project.featured && <span style={{ fontSize: '0.8rem', color: '#ffd700', fontWeight: 'bold' }}>★ Featured</span>}
                </td>
                <td>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                        {project.techTags?.map((tag, i) => (
                            <span key={i} style={{ backgroundColor: '#282c34', padding: '2px 8px', borderRadius: '10px', fontSize: '0.8rem', border: '1px solid #9067C6', color: '#9067C6' }}>{tag}</span>
                        ))}
                    </div>
                </td>
                <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '0.9rem' }}>
                        {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" style={{ color: '#9067C6' }}>Github</a>}
                        {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" style={{ color: '#9067C6' }}>Live Demo</a>}
                    </div>
                </td>
                <td>
                  <button onClick={() => handleEdit(project)} className="admin-btn" style={{ marginRight: '8px', padding: '5px 10px' }}><MdEdit /></button>
                  <button onClick={() => handleDelete(project.id)} className="admin-btn btn-danger" style={{ padding: '5px 10px' }}><MdDelete /></button>
                </td>
              </tr>
            ))}
            {projects.length === 0 && <tr><td colSpan={5} style={{ textAlign: 'center' }}>No projects found</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Projects;
