import React, { useEffect, useState } from 'react';
import { blogService } from '../services/blogService';
import { BlogPost } from '../types';
import { MdEdit, MdDelete, MdAdd } from 'react-icons/md';
import placeholderImg from '../../assets/images/placeholder.png';
import { useTranslation } from 'react-i18next';

const Blogs = () => {
  const { t } = useTranslation();
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
    if (window.confirm(t('Admin.DeleteConfirm'))) {
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

    // Validation: enforce Constraint chk_medium_url
    if (currentBlog.mediumUrl && !currentBlog.mediumUrl.startsWith('https://medium.com/')) {
        alert('Medium URL must start with https://medium.com/');
        return;
    }

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
          <h2>{currentBlog.id ? t('Admin.EditBlog') : t('Admin.NewBlog')}</h2>
          <button onClick={() => setIsEditing(false)} className="admin-btn">{t('Admin.Cancel')}</button>
        </div>
        <div className="admin-card">
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
              <label>{t('Admin.Title')} <span style={{color: 'red'}}>*</span></label>
              <input
                value={currentBlog.title || ''}
                onChange={e => setCurrentBlog({ ...currentBlog, title: e.target.value })}
                required
              />
            </div>
            
            <div className="form-group">
              <label>{t('Admin.ShortDesc')}</label>
              <textarea
                value={currentBlog.shortDescription || ''}
                onChange={e => setCurrentBlog({ ...currentBlog, shortDescription: e.target.value })}
                rows={3}
              />
            </div>

            <div className="form-group">
              <label>{t('Admin.ImageURL')}</label>
              <input
                value={currentBlog.image || ''}
                onChange={e => setCurrentBlog({ ...currentBlog, image: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <div className="form-group">
              <label>{t('Admin.MediumURL')} <span style={{color: 'red'}}>*</span></label>
              <input
                value={currentBlog.mediumUrl || ''}
                onChange={e => setCurrentBlog({ ...currentBlog, mediumUrl: e.target.value })}
                required
                placeholder="https://medium.com/..."
              />
            </div>

             <div className="form-group">
              <label>{t('Admin.PublishedAt')}</label>
              <input
                type="date"
                value={currentBlog.publishedAt ? String(currentBlog.publishedAt).substring(0, 10) : ''}
                onChange={e => setCurrentBlog({ ...currentBlog, publishedAt: e.target.value })}
              />
            </div>
            
            <button type="submit" className="admin-btn btn-primary">{t('Admin.Save')}</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="admin-header">
        <h2>{t('Admin.Blogs')}</h2>
        <button onClick={handleCreate} className="admin-btn btn-primary"><MdAdd /> {t('Admin.NewBlog')}</button>
      </div>
      <div className="admin-card" style={{ overflowX: 'auto' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: '80px'}}>{t('Admin.Image')}</th>
              <th>{t('Admin.Title')}</th>
              <th>{t('Admin.MediumURL')}</th>
              <th>{t('Admin.PublishedAt')}</th>
              <th>{t('Admin.Actions')}</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map(blog => (
              <tr key={blog.id}>
                <td>
                  <img src={blog.image || placeholderImg} alt="thumbnail" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                </td>
                <td style={{ fontWeight: 600 }}>{blog.title}</td>
                <td>
                    <a href={blog.mediumUrl} target="_blank" rel="noreferrer" style={{ color: '#9067C6' }}>{t('Admin.View')}</a>
                </td>
                <td>
                    {blog.publishedAt 
                        ? new Date(blog.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) 
                        : t('Admin.Draft')}
                </td>
                <td>
                  <button onClick={() => handleEdit(blog)} className="admin-btn" style={{ marginRight: '8px', padding: '5px 10px' }}><MdEdit /></button>
                  <button onClick={() => handleDelete(blog.id)} className="admin-btn btn-danger" style={{ padding: '5px 10px' }}><MdDelete /></button>
                </td>
              </tr>
            ))}
            {blogs.length === 0 && <tr><td colSpan={5} style={{ textAlign: 'center' }}>{t('Admin.NoBlogs')}</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Blogs;
