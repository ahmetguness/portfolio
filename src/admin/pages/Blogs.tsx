import React, { useEffect, useState } from 'react';
import { blogService } from '../services/blogService';
import { BlogPost } from '../types';
import { MdEdit, MdDelete, MdAdd } from 'react-icons/md';

const Blogs = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<Partial<BlogPost>>({});

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    const data = await blogService.list();
    setBlogs(data);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      await blogService.remove(id);
      loadBlogs();
    }
  };

  const handleEdit = (blog: BlogPost) => {
    setCurrentBlog(blog);
    setIsEditing(true);
  };

  const handleCreate = () => {
    setCurrentBlog({});
    setIsEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentBlog.id) {
      await blogService.update(currentBlog.id, currentBlog);
    } else {
      await blogService.create(currentBlog as BlogPost);
    }
    setIsEditing(false);
    loadBlogs();
  };

  if (isEditing) {
    return (
      <div>
        <div className="admin-header">
          <h2>{currentBlog.id ? 'Edit Blog' : 'New Blog'}</h2>
          <button onClick={() => setIsEditing(false)} className="admin-btn">Cancel</button>
        </div>
        <div className="admin-card">
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
              <label>Title <span style={{color: 'red'}}>*</span></label>
              <input
                value={currentBlog.title || ''}
                onChange={e => setCurrentBlog({ ...currentBlog, title: e.target.value })}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Short Description</label>
              <textarea
                value={currentBlog.shortDescription || ''}
                onChange={e => setCurrentBlog({ ...currentBlog, shortDescription: e.target.value })}
                rows={3}
              />
            </div>

            <div className="form-group">
              <label>Image URL</label>
              <input
                value={currentBlog.image || ''}
                onChange={e => setCurrentBlog({ ...currentBlog, image: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <div className="form-group">
              <label>Medium URL <span style={{color: 'red'}}>*</span></label>
              <input
                value={currentBlog.mediumUrl || ''}
                onChange={e => setCurrentBlog({ ...currentBlog, mediumUrl: e.target.value })}
                required
                placeholder="https://medium.com/..."
              />
            </div>

             <div className="form-group">
              <label>Published At</label>
              <input
                type="date"
                value={currentBlog.publishedAt || ''}
                onChange={e => setCurrentBlog({ ...currentBlog, publishedAt: e.target.value })}
              />
            </div>
            
            <button type="submit" className="admin-btn btn-primary">Save Blog</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="admin-header">
        <h2>Blogs</h2>
        <button onClick={handleCreate} className="admin-btn btn-primary"><MdAdd /> New Blog</button>
      </div>
      <div className="admin-card" style={{ overflowX: 'auto' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: '80px'}}>Image</th>
              <th>Title</th>
              <th>Medium URL</th>
              <th>Published</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map(blog => (
              <tr key={blog.id}>
                <td>
                  {blog.image && <img src={blog.image} alt="thumbnail" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />}
                </td>
                <td style={{ fontWeight: 600 }}>{blog.title}</td>
                <td>
                    <a href={blog.mediumUrl} target="_blank" rel="noreferrer" style={{ color: '#9067C6' }}>View</a>
                </td>
                <td>{blog.publishedAt || 'Draft'}</td>
                <td>
                  <button onClick={() => handleEdit(blog)} className="admin-btn" style={{ marginRight: '8px', padding: '5px 10px' }}><MdEdit /></button>
                  <button onClick={() => handleDelete(blog.id)} className="admin-btn btn-danger" style={{ padding: '5px 10px' }}><MdDelete /></button>
                </td>
              </tr>
            ))}
            {blogs.length === 0 && <tr><td colSpan={5} style={{ textAlign: 'center' }}>No blogs found</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Blogs;
