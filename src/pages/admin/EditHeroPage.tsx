import React, { useState } from 'react';
import { useHero } from '../../data/HeroContext';
import { useNavigate } from 'react-router-dom';

const EditHeroPage: React.FC = () => {
  const { heroContent, setHeroContent } = useHero();
  const navigate = useNavigate();

  const [content, setContent] = useState(heroContent);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContent(prevContent => ({
      ...prevContent,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHeroContent(content);
    alert('Hero section updated successfully! This change is temporary and will be lost on page reload.');
    navigate('/');
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-light-gray">Edit Hero Section</h1>
      <div className="bg-card-blue shadow-md rounded-lg p-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-mid-gray text-sm font-bold mb-2" htmlFor="line1">
              Introductory Line
            </label>
            <input
              id="line1"
              name="line1"
              type="text"
              value={content.line1}
              onChange={handleChange}
              className="shadow appearance-none border border-space-dark bg-space-dark text-light-gray rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-mid-gray text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={content.name}
              onChange={handleChange}
              className="shadow appearance-none border border-space-dark bg-space-dark text-light-gray rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-mid-gray text-sm font-bold mb-2" htmlFor="line2">
              Tagline
            </label>
            <input
              id="line2"
              name="line2"
              type="text"
              value={content.line2}
              onChange={handleChange}
              className="shadow appearance-none border border-space-dark bg-space-dark text-light-gray rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-mid-gray text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={content.description}
              onChange={handleChange}
              className="shadow appearance-none border border-space-dark bg-space-dark text-light-gray rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline h-32"
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

export default EditHeroPage;
