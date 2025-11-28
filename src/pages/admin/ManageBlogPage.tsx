import React from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '../../data/BlogContext';

const ManageBlogPage: React.FC = () => {
  const { posts, deletePost } = useBlog();

  const handleDelete = (slug: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(slug);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-light-gray">Manage Blog Posts</h1>
        <Link
          to="/admin/add-blog"
          className="bg-accent-cyan/10 hover:bg-accent-cyan/20 text-accent-cyan font-bold py-2 px-4 rounded"
        >
          Add New Post
        </Link>
      </div>
      <div className="bg-card-blue shadow-md rounded-lg p-8">
        <ul className="space-y-4">
          {posts.map(post => (
            <li key={post.slug} className="flex justify-between items-center bg-space-dark p-4 rounded-md">
              <span className="text-light-gray">{post.title}</span>
              <div>
                <Link to={`/admin/edit-blog/${post.slug}`} className="text-accent-cyan mr-4">Edit</Link>
                <button onClick={() => handleDelete(post.slug)} className="text-red-500">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageBlogPage;
