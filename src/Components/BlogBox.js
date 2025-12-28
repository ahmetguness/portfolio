import React from 'react';
import {CgFileDocument} from "react-icons/cg";

const BlogBox = ({blogPhoto, blogName, blogDesc, blogLink}) => {
  return (
    <div className='projectBox'> 
        <img className='projectPhoto' src={blogPhoto} alt="Blog display" /> 
        <div>
            <br />
            <h3>{blogName}</h3>
            <br />
            {blogDesc}
            <br />

            <a href={blogLink} target='_blank'>
              <button className='projectbtn'><CgFileDocument/> Read More</button>
            </a>
        </div>
    </div>
  )
}

export default BlogBox;