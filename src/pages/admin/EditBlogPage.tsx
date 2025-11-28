import React, { useState, useEffect } from 'react';
import { useBlog } from '../../data/BlogContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Post } from '../../data/blog';

const EditBlogPage: React.FC = () => {
  const { posts, updatePost } = useBlog();
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const postToEdit = posts.find(p => p.slug === slug);
    if (postToEdit) {
      setPost(postToEdit);
    }
  }, [slug, posts]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (post) {
      const { name, value } = e.target;
      setPost({
        ...post,
        [name]: value,
      });
    }
  };
  
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (post) {
      setPost({
        ...post,
        tags: e.target.value.split(',').map(tag => tag.trim()),
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (post && slug) {
      updatePost(slug, post);
      alert('Blog post updated successfully! This change is temporary and will be lost on page reload.');
      navigate('/admin/manage-blog');
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-light-gray">Edit Blog Post</h1>
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
              value={post.title}
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
              value={post.slug}
              onChange={handleChange}
              className="shadow appearance-none border border-space-dark bg-space-dark text-light-gray rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-mid-gray text-sm font-bold mb-2" htmlFor="tags">
              Tags (comma-separated)
            </label>
            <input
              id="tags"
              type="text"
              value={post.tags.join(', ')}
              onChange={handleTagsChange}
              className="shadow appearance-none border border-space-dark bg-space-dark text-light-gray rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-mid-gray text-sm font-bold mb-2" htmlFor="image">
              Image URL
            </label>
            <input
              id="image"
              name="image"
              type="text"
              value={post.image}
              onChange={handleChange}
              className="shadow appearance-none border border-space-dark bg-space-dark text-light-gray rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label className="block text-mid-gray text-sm font-bold mb-2" htmlFor="content">
              Content (Markdown)
            </label>
            <textarea
              id="content"
              name="content"
              value={post.content}
              onChange={handleChange}
              className="shadow appearance-none border border-space-dark bg-space-dark text-light-gray rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline h-48"
              required
            />
          </div>
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="bg-accent-cyan/10 hover:bg-accent-cyan/20 text-accent-cyan font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlogPage;
