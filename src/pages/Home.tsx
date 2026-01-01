import React from 'react';
import Lottie from  "lottie-react";
import SpaceBoy from "../assets/lottie/SpaceBoy.json";
import Typed from "../components/Typed";
import Tilt from 'react-parallax-tilt';
import Avatar from '../assets/images/Avatar.png';

import { useTranslation, Trans } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  return (
    <div >
      <div className='HomePage'>

        <div className='HomeText'>
          <h1>{t('Home.Hi')}</h1>
          <h1>{t('Home.Im')} <b>Ahmet Güneş</b></h1>
          <Typed/>   
        </div>

        <Lottie 
          className="illustration" 
          animationData={SpaceBoy} 
          loop={true} 
        />
        
      </div>

      <div className='AboutPage'>
        <div className='AboutText'>
          <h1 className='AboutTextHeading'>
            <Trans i18nKey="Home.IntroHeading" components={{ b: <b /> }} />
          </h1>
          <p>
            {t('Home.IntroParagraph1')}<br /><br />
            <Trans i18nKey="Home.IntroParagraph2" components={{ b: <b /> }} /><br />
            <Trans i18nKey="Home.IntroParagraph3" components={{ b: <b /> }} /> <br /><br />

          </p>
        </div>
        <Tilt>
          <img className='Avatar' src={Avatar} alt="" />
        </Tilt>
      </div>
    </div>
  )
}

export default Home