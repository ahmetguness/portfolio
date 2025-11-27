import React from 'react';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Projects from '../sections/Projects';
import Blog from '../sections/Blog';
import Contact from '../sections/Contact';

const HomePage = () => {
  return (
    <>
      <section id="hero" className="min-h-screen flex items-center -mx-6 sm:-mx-12 md:-mx-24 lg:-mx-48 px-6 sm:px-12 md:px-24 lg:px-48">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="blog">
        <Blog />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </>
  );
};

export default HomePage;
