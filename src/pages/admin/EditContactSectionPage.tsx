import React, { useState } from 'react';
import { useContactSection } from '../../data/ContactSectionContext';
import { useNavigate } from 'react-router-dom';

const EditContactSectionPage: React.FC = () => {
  const { contactSectionContent, setContactSectionContent } = useContactSection();
  const navigate = useNavigate();

  const [content, setContent] = useState(contactSectionContent);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContent(prevContent => ({
      ...prevContent,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSectionContent(content);
    alert('Contact section updated successfully! This change is temporary and will be lost on page reload.');
    navigate('/');
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-light-gray">Edit Contact Section</h1>
      <div className="bg-card-blue shadow-md rounded-lg p-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-mid-gray text-sm font-bold mb-2" htmlFor="preTitle">
              Pre-title
            </label>
            <input
              id="preTitle"
              name="preTitle"
              type="text"
              value={content.preTitle}
              onChange={handleChange}
              className="shadow appearance-none border border-space-dark bg-space-dark text-light-gray rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-mid-gray text-sm font-bold mb-2" htmlFor="title">
              Title
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
          <div className="mb-4">
            <label className="block text-mid-gray text-sm font-bold mb-2" htmlFor="paragraph">
              Paragraph
            </label>
            <textarea
              id="paragraph"
              name="paragraph"
              value={content.paragraph}
              onChange={handleChange}
              className="shadow appearance-none border border-space-dark bg-space-dark text-light-gray rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline h-32"
            />
          </div>
          <div className="mb-6">
            <label className="block text-mid-gray text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={content.email}
              onChange={handleChange}
              className="shadow appearance-none border border-space-dark bg-space-dark text-light-gray rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label className="block text-mid-gray text-sm font-bold mb-2" htmlFor="githubUrl">
              GitHub URL
            </label>
            <input
              id="githubUrl"
              name="githubUrl"
              type="text"
              value={content.githubUrl}
              onChange={handleChange}
              className="shadow appearance-none border border-space-dark bg-space-dark text-light-gray rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label className="block text-mid-gray text-sm font-bold mb-2" htmlFor="linkedinUrl">
              LinkedIn URL
            </label>
            <input
              id="linkedinUrl"
              name="linkedinUrl"
              type="text"
              value={content.linkedinUrl}
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

export default EditContactSectionPage;
