import React from 'react';
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { useTranslation, Trans } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer>
      <h4>{t('Footer.DevelopedBy')}</h4>
      <h4><Trans i18nKey="Footer.Copyright" /></h4>
      <div className='footerLinks'>
        <a href="https://github.com/ahmetguness" target='_blank' rel="noreferrer"><FaGithub /></a>
        <a href="https://www.linkedin.com/in/ahmet-g%C3%BCne%C5%9F-52381b27a/" target='_blank' rel="noreferrer"><FaLinkedin /></a>
        <a href='mailTo:ahmetgunes.ceng@gmail.com' target='_blank' rel="noreferrer"><GrMail /></a>

      </div>
    </footer>
  )
}

export default Footer