import React from 'react';
import {FaGithub} from "react-icons/fa";
import {CgFileDocument} from "react-icons/cg";

interface ProjectBoxProps {
  projectPhoto: string;
  projectName: string;
}

const ProjectBox: React.FC<ProjectBoxProps> = ({projectPhoto, projectName}) => {
  const desc: Record<string, any> = {
    TindogDesc : "This website is a landing page of Tinder but for dogs. It is a responsive website which was made to understand Bootstrap. I also learned how to host my project on Github and then how to deploy that project using Github pages.",
    TindogGithub : "https://github.com/ahmetguness/tindog",
    TindogWebsite : "https://ahmetguness.github.io/tindog/",
    TindogTags: ["React", "Bootstrap"],

    RogFreeDesc : "A website that shows you over seven specialized yoga postures for specific diseases or health problems. This was a group project made in a team of two for a 36-hour-long online hackathon named Hackodisha 2.0.",
    RogFreeGithub : "https://github.com/ahmetguness/Rog-Free",
    RogFreeWebsite : "https://ahmetguness.github.io/Rog-Free/",
    RogFreeTags: ["React", "Node.js", "MongoDB"],

    NewsletterDesc:"A newsletter signup site made using Mailchimp API where the signups can be monitored from the MailChimp account. This project was made to understand API integration, environment variables and vercel deployment.",
    NewsletterGithub:"",
    NewsletterWebsite:"https://newsletter-signup-teal.vercel.app/",
    NewsletterTags: ["React", "Node.js", "Mailchimp API"],
    
    WigglesDesc:"An innovative pet management web app enabling pet parents to create unique pet IDs, securely store and share vaccination records, and generate QR codes for pet profiles, enhancing safety.",
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
              <button className='projectbtn'><FaGithub/> Github</button>
            </a>

            <a href={desc[projectName + 'Website']} target='_blank' rel="noreferrer">
              <button className='projectbtn'><CgFileDocument/> Demo</button>
            </a>
        </div>
    </div>
  )
}

export default  ProjectBox