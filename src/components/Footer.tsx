import React from 'react';
import {FaGithub, FaLinkedin} from "react-icons/fa";
import {GrMail} from "react-icons/gr";

const Footer = () => {
  return (
    <footer>
      <h4>Developed by Ahmet Güneş</h4>
      <h4>Copyright &copy; 2024 AG</h4>
      <div className='footerLinks'>
        <a href="https://github.com/ahmetguness" target='_blank'><FaGithub/></a>
        <a href="https://www.linkedin.com/in/ahmet-g%C3%BCne%C5%9F-52381b27a/" target='_blank'><FaLinkedin/></a>
        <a href='mailTo:ahmetgunes.ceng@gmail.com' target='_blank'><GrMail/></a>
      </div>
    </footer>
  )
}

export default Footer