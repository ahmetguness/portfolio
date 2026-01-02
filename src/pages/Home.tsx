import React from 'react';
import Lottie from "lottie-react";
import SpaceBoy from "../assets/lottie/SpaceBoy.json";
import Typed from "../components/Typed";
import Tilt from 'react-parallax-tilt';
import AvatarPlaceholder from '../assets/images/Avatar.png';
import config from '../config';

import { useTranslation, Trans } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  const [avatarUrl, setAvatarUrl] = React.useState<string>('');

  React.useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/settings`);
        const data = await response.json();
        if (data.avatar_url) {
          let url = data.avatar_url;
          if (url.includes('dropbox.com') && url.includes('dl=0')) {
            url = url.replace('dl=0', 'raw=1');
          }
          setAvatarUrl(url);
        }
      } catch (error) {
        console.error("Failed to fetch avatar", error);
      }
    };
    fetchSettings();
  }, []);

  return (
    <div >
      <div className='HomePage'>

        <div className='HomeText'>
          <h1>{t('Home.Hi')}</h1>
          <h1>{t('Home.Im')} <b>Ahmet Güneş</b></h1>
          <Typed />
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
          <img className='Avatar' src={avatarUrl || AvatarPlaceholder} alt="Profile" />
        </Tilt>
      </div>
    </div>
  )
}

export default Home