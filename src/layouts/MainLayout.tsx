import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../sections/Footer';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';

const MainLayout = () => {
  return (
    <div className="bg-space-dark">
      <Navbar />
      <LeftSidebar />
      <RightSidebar />
      <main className="container mx-auto px-6 sm:px-12 md:px-24 lg:px-48">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
