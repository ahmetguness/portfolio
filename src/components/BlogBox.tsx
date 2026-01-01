import React from 'react';
import { useTranslation } from 'react-i18next';
import {CgFileDocument} from "react-icons/cg";
import placeholderImg from '../assets/images/placeholder.png';

interface BlogBoxProps {
  blogPhoto: string;
  blogName: string;
  blogDesc: string;
  blogLink: string;
  date?: string;
}

const BlogBox: React.FC<BlogBoxProps> = ({blogPhoto, blogName, blogDesc, blogLink, date}) => {
  const { t } = useTranslation();
  
  // Format date if provided
  const formattedDate = date ? new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

  return (
    <div className='projectBox'> 
        <img className='projectPhoto' src={blogPhoto || placeholderImg} alt="Blog display" /> 
        <div className='projectContent'>
            {formattedDate && <span className='projectDate'>{formattedDate}</span>}
            <h3 className='projectTitle'>{blogName}</h3>
            
            <p className='projectDesc'>
              {blogDesc}
            </p>

            <div className='projectBtnGroup'>
              <a href={blogLink} target='_blank' rel="noreferrer">
                <button className='projectbtn'><CgFileDocument/> {t('Blog.ReadMore')}</button>
              </a>
            </div>
        </div>
    </div>
  )
}

export default BlogBox;