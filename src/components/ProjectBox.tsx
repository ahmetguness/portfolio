import React from 'react';
import { useTranslation } from 'react-i18next';
import {FaGithub} from "react-icons/fa";
import {CgFileDocument} from "react-icons/cg";

interface ProjectBoxProps {
  projectPhoto: string;
  projectName: string;
}

const ProjectBox: React.FC<ProjectBoxProps> = ({projectPhoto, projectName}) => {
  const { t } = useTranslation();
  
  const desc: Record<string, any> = {
    TindogDesc : t('Projects.TindogDesc'),
    TindogGithub : "https://github.com/ahmetguness/tindog",
    TindogWebsite : "https://ahmetguness.github.io/tindog/",
    TindogTags: ["React", "Bootstrap"],

    RogFreeDesc : t('Projects.RogFreeDesc'),
    RogFreeGithub : "https://github.com/ahmetguness/Rog-Free",
    RogFreeWebsite : "https://ahmetguness.github.io/Rog-Free/",
    RogFreeTags: ["React", "Node.js", "MongoDB"],

    NewsletterDesc: t('Projects.NewsletterDesc'),
    NewsletterGithub:"",
    NewsletterWebsite:"https://newsletter-signup-teal.vercel.app/",
    NewsletterTags: ["React", "Node.js", "Mailchimp API"],
    
    WigglesDesc: t('Projects.WigglesDesc'),
    WigglesGithub:"https://github.com/ahmetguness/Wiggles",
    WigglesWebsite:"https://wiggles.vercel.app/",
    WigglesTags: ["React", "Node.js", "MongoDB"],
  }

  let show ='';
  if(desc[projectName + 'Github']===""){
    show="none";
  }
    
  return (
    <div className='projectBox'> 
        <img className='projectPhoto' src={projectPhoto} alt="Project display" /> 
        <div>
            <br />
            <h3>{projectName}</h3>
            <br />
            {desc[projectName + 'Desc']}
            <br />

            <div className='projectTags'>
              {desc[projectName + 'Tags'] && desc[projectName + 'Tags'].map((tag: string, index: number) => (
                <button key={index} className='projectTag'>{tag}</button>
              ))}
            </div>

            <a style={{display:show}} href={desc[projectName + 'Github']} target='_blank' rel="noreferrer">
              <button className='projectbtn'><FaGithub/> {t('Projects.Github')}</button>
            </a>

            <a href={desc[projectName + 'Website']} target='_blank' rel="noreferrer">
              <button className='projectbtn'><CgFileDocument/> {t('Projects.Demo')}</button>
            </a>
        </div>
    </div>
  )
}

export default  ProjectBox