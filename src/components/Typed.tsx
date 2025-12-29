import React from 'react';
import Typewriter from  'typewriter-effect';
import { useTranslation } from 'react-i18next';

const Typed = () => {
  const { t } = useTranslation();
  return (
    <div className="TypeEffect">
      <Typewriter
        options={{
          strings: t('Typed.Strings', { returnObjects: true }) as string[],
          autoStart: true,
          loop: true,
          delay: 70,
          deleteSpeed:20,
        }}
      />
    </div>
  )
}

export default Typed
