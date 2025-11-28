import React, { useState } from 'react';
import { useAbout } from '../../data/AboutContext';
import { useNavigate } from 'react-router-dom';

const EditAboutPage: React.FC = () => {
  const { aboutText, setAboutText } = useAbout();
  const navigate = useNavigate();

  const [text, setText] = useState(aboutText);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAboutText(text);
    alert('About Me section updated successfully! This change is temporary and will be lost on page reload.');
    navigate('/#about'); // Redirecting to home page and scrolling to about section.
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-light-gray">Edit About Me</h1>
      <div className="bg-card-blue shadow-md rounded-lg p-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-mid-gray text-sm font-bold mb-2" htmlFor="about-text">
              About Me Content
            </label>
            <textarea
              id="about-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="shadow appearance-none border border-space-dark bg-space-dark text-light-gray rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline h-64"
              required
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
        <b>Note:</b> For this demonstration, changes are stored in-memory and will be lost on page reload. A real application would require a backend database to persist this data.
      </p>
    </div>
  );
};

export default EditAboutPage;
