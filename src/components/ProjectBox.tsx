import React from 'react';
import { useTranslation } from 'react-i18next';
import {FaGithub} from "react-icons/fa";
import {CgFileDocument} from "react-icons/cg";

interface ProjectBoxProps {
  projectPhoto?: string;
  projectName: string;
  desc: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
}

const ProjectBox: React.FC<ProjectBoxProps> = ({projectPhoto, projectName, desc, tags, githubUrl, liveUrl}) => {
  const { t } = useTranslation();
  
  let show = '';
  if(!githubUrl){
    show="none";
  }
    
  return (
    <div className='projectBox'> 
        {/* Placeholder image if none provided */}
        <img className='projectPhoto' src={projectPhoto || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"} alt="Project display" /> 
        <div>
            <br />
            <h3>{projectName}</h3>
            <br />
            {desc}
            <br />

            <div className='projectTags'>
              {tags && tags.map((tag: string, index: number) => (
                <button key={index} className='projectTag'>{tag}</button>
              ))}
            </div>

            <a style={{display:show}} href={githubUrl} target='_blank' rel="noreferrer">
              <button className='projectbtn'><FaGithub/> {t('Projects.Github')}</button>
            </a>

            {liveUrl && (
              <a href={liveUrl} target='_blank' rel="noreferrer">
                <button className='projectbtn'><CgFileDocument/> {t('Projects.Demo')}</button>
              </a>
            )}
        </div>
    </div>
  )
}

export default  ProjectBox