import React, { useState } from 'react';
import { useBlogSection } from '../../data/BlogSectionContext';
import { useNavigate } from 'react-router-dom';

const EditBlogSectionPage: React.FC = () => {
  const { blogSectionContent, setBlogSectionContent } = useBlogSection();
  const navigate = useNavigate();

  const [content, setContent] = useState(blogSectionContent);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContent(prevContent => ({
      ...prevContent,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBlogSectionContent(content);
    alert('Blog section updated successfully! This change is temporary and will be lost on page reload.');
    navigate('/');
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-light-gray">Edit Blog Section</h1>
      <div className="bg-card-blue shadow-md rounded-lg p-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-mid-gray text-sm font-bold mb-2" htmlFor="title">
              Section Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={content.title}
              onChange={handleChange}
              className="shadow appearance-none border border-space-dark bg-space-dark text-light-gray rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label className="block text-mid-gray text-sm font-bold mb-2" htmlFor="buttonText">
              Button Text
            </label>
            <input
              id="buttonText"
              name="buttonText"
              type="text"
              value={content.buttonText}
              onChange={handleChange}
              className="shadow appearance-none border border-space-dark bg-space-dark text-light-gray rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="bg-accent-cyan/10 hover:bg-accent-cyan/20 text-accent-cyan font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
      <p className="text-center text-mid-gray text-xs mt-4">
        <b>Note:</b> For this demonstration, changes are stored in-memory and will be lost on page reload.
      </p>
    </div>
  );
};

export default EditBlogSectionPage;
