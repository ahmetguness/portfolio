import { FiGithub, FiLinkedin, FiMail, FiTwitter } from 'react-icons/fi';
import { SocialLink } from '../types/social';

export const socialLinks: SocialLink[] = [
    { 
        name: 'GitHub', 
        icon: <FiGithub />, 
        url: 'https://github.com/ahmetguness' 
    },
    { 
        name: 'LinkedIn', 
        icon: <FiLinkedin />, 
        url: 'https://www.linkedin.com/in/ahmet-g%C3%BCne%C5%9F-52381b27a/' 
    },
    { 
        name: 'Email', 
        icon: <FiMail />, 
        url: 'mailto:ahmetgunes.ceng@gmail.com' 
    },
    { 
        name: 'Twitter', 
        icon: <FiTwitter />, 
        url: 'https://twitter.com/ahmetguness' // Assuming twitter handle
    },
];
