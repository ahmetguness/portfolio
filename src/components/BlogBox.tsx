import React from 'react';
import { useTranslation } from 'react-i18next';
import {CgFileDocument} from "react-icons/cg";

interface BlogBoxProps {
  blogPhoto: string;
  blogName: string;
  blogDesc: string;
  blogLink: string;
}

const BlogBox: React.FC<BlogBoxProps> = ({blogPhoto, blogName, blogDesc, blogLink}) => {
  const { t } = useTranslation();
  return (
    <div className='projectBox'> 
        <img className='projectPhoto' src={blogPhoto} alt="Blog display" /> 
        <div>
            <br />
            <h3>{blogName}</h3>
            <br />
            {blogDesc}
            <br />

            <a href={blogLink} target='_blank' rel="noreferrer">
              <button className='projectbtn'><CgFileDocument/> {t('Blog.ReadMore')}</button>
            </a>
        </div>
    </div>
  )
}

export default BlogBox;