import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaGithub } from "react-icons/fa";
import { CgFileDocument } from "react-icons/cg";
import placeholderImg from '../assets/images/placeholder.png';

interface ProjectBoxProps {
  projectPhoto?: string;
  projectName: string;
  desc: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  featured?: boolean;
}

const ProjectBox: React.FC<ProjectBoxProps> = ({ projectPhoto, projectName, desc, tags, githubUrl, liveUrl, featured }) => {
  const { t } = useTranslation();

  let show = '';
  if (!githubUrl) {
    show = "none";
  }

  const [displayImage, setDisplayImage] = React.useState(projectPhoto || placeholderImg);

  React.useEffect(() => {
    setDisplayImage(projectPhoto || placeholderImg);
  }, [projectPhoto]);

  return (
    <div className='projectBox' style={{ position: 'relative' }}>
      {/* Featured Badge */}
      {featured && (
        <div style={{
          position: 'absolute',
          top: '15px',
          right: '15px',
          backgroundColor: '#ffd700',
          color: '#000',
          padding: '5px 10px',
          borderRadius: '20px',
          fontWeight: 'bold',
          fontSize: '0.8rem',
          zIndex: 10,
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        }}>
          ★ {t('Projects.Featured')}
        </div>
      )}

      {/* Placeholder image if none provided */}
      <img
        className='projectPhoto'
        src={displayImage}
        onError={() => setDisplayImage(placeholderImg)}
        alt="Project display"
      />
      <div className='projectContent'>
        <h3 className='projectTitle'>{projectName}</h3>

        <p className='projectDesc'>
          {desc}
        </p>

        <div className='projectTags'>
          {tags && tags.map((tag: string, index: number) => (
            <button key={index} className='projectTag'>{tag}</button>
          ))}
        </div>

        <div className='projectBtnGroup'>
          <a style={{ display: show }} href={githubUrl} target='_blank' rel="noreferrer">
            <button className='projectbtn'><FaGithub /> {t('Projects.Github')}</button>
          </a>

          {liveUrl && (
            <a href={liveUrl} target='_blank' rel="noreferrer">
              <button className='projectbtn'><CgFileDocument /> {t('Projects.Demo')}</button>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectBox