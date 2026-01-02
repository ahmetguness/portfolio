import React from 'react';
import Skills from '../components/Skills';
import Tilt from 'react-parallax-tilt';
import Lottie from "lottie-react"
import CodingBoy from '../assets/lottie/Coding-boy.json';
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
              animationData={CodingBoy}
              loop={true}
            />
          </Tilt>
        </div>

      </div>

      <h1 className='SkillsHeading'>{t('About.SkillsHeading')}</h1>
      <div className='skills'>

        <Skills skill='React Native' />
        <Skills skill='React' />
        <Skills skill='TypeScript' />
        <Skills skill='Javascript' />
        <Skills skill='Backend' />
        <Skills skill='SQL' />
        <Skills skill='PostgreSQL' />
        <Skills skill='Linux' />
        <Skills skill='n8n' />

      </div>
    </>
  )
}

export default About