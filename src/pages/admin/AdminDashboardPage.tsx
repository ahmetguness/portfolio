import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboardPage: React.FC = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Manage Homepage Sections */}
        <div className="bg-card-blue overflow-hidden shadow rounded-lg">
          <div className="p-6">
            <h3 className="text-xl leading-6 font-bold text-light-gray">Homepage Sections</h3>
            <div className="mt-4 space-y-4">
              <Link to="/admin/edit-hero" className="block hover:bg-card-blue/80 transition-colors p-4 rounded-md">
                <p className="font-bold text-accent-cyan">Edit Hero Section &rarr;</p>
              </Link>
              <Link to="/admin/edit-about" className="block hover:bg-card-blue/80 transition-colors p-4 rounded-md">
                <p className="font-bold text-accent-cyan">Edit About Me Section &rarr;</p>
              </Link>
              <Link to="/admin/edit-contact-section" className="block hover:bg-card-blue/80 transition-colors p-4 rounded-md">
                <p className="font-bold text-accent-cyan">Edit Contact Section &rarr;</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Manage Blog */}
        <Link to="/admin/manage-blog" className="bg-card-blue overflow-hidden shadow rounded-lg block hover:bg-card-blue/80 transition-colors">
          <div className="p-6">
            <h3 className="text-xl leading-6 font-bold text-light-gray">Blog</h3>
            <p className="mt-2 text-base text-mid-gray">
              Add, edit, or delete blog posts.
            </p>
            <div className="mt-4">
              <p className="font-bold text-accent-cyan">Manage Blog &rarr;</p>
            </div>
          </div>
        </Link>
        
        {/* Manage Projects */}
        <Link to="/admin/manage-projects" className="bg-card-blue overflow-hidden shadow rounded-lg block hover:bg-card-blue/80 transition-colors">
          <div className="p-6">
            <h3 className="text-xl leading-6 font-bold text-light-gray">Projects</h3>
            <p className="mt-2 text-base text-mid-gray">
              Add, edit, or delete projects.
            </p>
            <div className="mt-4">
              <p className="font-bold text-accent-cyan">Manage Projects &rarr;</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
