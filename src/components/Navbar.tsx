import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {AiOutlineHome} from "react-icons/ai";
import {BsPerson, BsCodeSlash} from "react-icons/bs";
import {CgFileDocument} from "react-icons/cg";
import { FaBlog } from "react-icons/fa";
import { useTranslation } from 'react-i18next';


const Nav = () => {
    const [navbarblur, setnavbarblur]=useState(false);
    const { t, i18n } = useTranslation();

    function scrollHandler() {
        if (window.scrollY >= 20) {
            setnavbarblur(true);
        } 
        else {
            setnavbarblur(false);
        }
    }

    const showMenu = ()=>{
        const bar = document.getElementsByClassName("bar");
        const ham = document.getElementsByClassName("NavbarLinks");
        if (bar.length > 0 && ham.length > 0) {
            bar[0].classList.toggle("barOne");
            bar[1].classList.toggle("barTwo");
            bar[2].classList.toggle("barThree");
            ham[0].classList.toggle("showNavbar");
        }
    }

    const hideMenu = ()=>{
        const bar = document.getElementsByClassName("bar");
        const ham = document.getElementsByClassName("NavbarLinks");
        if (bar.length > 0 && ham.length > 0) {
            bar[0].classList.remove("barOne");
            bar[1].classList.remove("barTwo");
            bar[2].classList.remove("barThree");
            ham[0].classList.remove("showNavbar");
        }
    }

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        hideMenu();
    };
    
    window.addEventListener("scroll", scrollHandler);

  return (
    <nav className={navbarblur? 'Navbar blur':'Navbar'}> 
 
        <h1 title='Reload' onClick={()=>window.location.reload()} className='Logo'>AG</h1>

        <div className='Hamburger' onClick={showMenu}>
            <span className='bar'></span>
            <span className='bar'></span>
            <span className='bar'></span>
        </div>

        <ul className='NavbarLinks'>
            <li onClick={hideMenu}><Link to="/"><AiOutlineHome/> {t('Navbar.Home')}</Link></li>
            <li onClick={hideMenu}><Link to="/About"><BsPerson/> {t('Navbar.About')}</Link></li>
            <li onClick={hideMenu}><Link to="/Project"><BsCodeSlash/> {t('Navbar.Projects')}</Link></li>
            <li onClick={hideMenu}><Link to="/Blog"><FaBlog/> {t('Navbar.Blog')}</Link></li>
            <li onClick={hideMenu}><Link to="/Resume"><CgFileDocument/> {t('Navbar.Resume')}</Link></li>
            <li>
                <div className="lang-toggle">
                    <button onClick={() => changeLanguage('en')} className={i18n.language === 'en' ? 'active-lang' : ''}>EN</button>
                    <span>/</span>
                    <button onClick={() => changeLanguage('tr')} className={i18n.language === 'tr' ? 'active-lang' : ''}>TR</button>
                </div>
            </li>
        </ul>
        
    </nav>
  )
}

export default Nav