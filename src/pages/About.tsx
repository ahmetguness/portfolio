import React from 'react';
import Skills from '../components/Skills';
import Tilt from 'react-parallax-tilt';
import Lottie from "lottie-react"
import Coder from '../assets/lottie/coder.json';
import { useTranslation, Trans } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className='AboutPage'>
        <div className='AboutText'>
          <h1 className='AboutTextHeading' >
            <Trans i18nKey="About.Heading" components={{ b: <b /> }} />
          </h1>
          <p>
            <Trans i18nKey="About.Paragraph" components={{ b: <b /> }} />
          </p>
        </div>

        <div>
           <Tilt>
              <Lottie 
              className="illustration" 
              animationData={Coder} 
              loop={true} 
            />
          </Tilt>
        </div>

      </div>
      
      <h1 className='SkillsHeading'>{t('About.SkillsHeading')}</h1>
      <div className='skills'>
        
        <Skills skill='React' />
        <Skills skill='Node' />
        <Skills skill='Express' />
        <Skills skill='MongoDb' />
        <Skills skill='Git' />
        <Skills skill='Github' />
        <Skills skill='Javascript' />
        <Skills skill='C++' />
        <Skills skill='Postman' />
        <Skills skill='Figma' />
        <Skills skill='Vercel' />
        <Skills skill='Npm' />
        <Skills skill='Bootstrap'/>
        
      </div>
    </>
  )
}

export default About