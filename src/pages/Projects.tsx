import React, { useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import ProjectBox from '../components/ProjectBox';
import api, { Project } from '../services/api';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await api.getProjects();
      setProjects(data);
    } catch (error) {
      console.error("Failed to load projects", error);
    }
  };

  return (
    <div>
      <h1 className='projectHeading'>
        <Trans i18nKey="Projects.Heading" components={{ b: <b /> }} />
      </h1>
      <div className='project'>
        {projects.map((project) => (
          <ProjectBox 
            key={project.id}
            projectName={project.title}
            desc={project.short_description}
            tags={project.tech_tags}
            githubUrl={project.github_url}
            liveUrl={project.live_url}
            projectPhoto={project.image_url}
          />
        ))}
        {projects.length === 0 && <p style={{textAlign: 'center'}}>No projects found.</p>}
      </div>

    </div>
  )
}

export default Projects