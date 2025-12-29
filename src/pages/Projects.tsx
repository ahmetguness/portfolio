import React from 'react';
import { Trans } from 'react-i18next';
import ProjectBox from '../components/ProjectBox';
import NewsletterImage from '../assets/images/NewsletterImage.png';
import RogfreeImage from '../assets/images/RogfreeImage.png';
import TindogImage from '../assets/images/TindogImage.png';
import WigglesImage from '../assets/images/WigglesImage.png';

const Projects = () => {
  return (
    <div>
      <h1 className='projectHeading'>
        <Trans i18nKey="Projects.Heading" components={{ b: <b /> }} />
      </h1>
      <div className='project'>
        <ProjectBox projectPhoto={WigglesImage} projectName="Wiggles" />
        <ProjectBox projectPhoto={NewsletterImage} projectName="Newsletter" />
        <ProjectBox projectPhoto={RogfreeImage} projectName="RogFree" />
        <ProjectBox projectPhoto={TindogImage} projectName="Tindog" />
      </div>

    </div>
  )
}

export default Projects