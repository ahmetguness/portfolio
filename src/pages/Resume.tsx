import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsDownload } from "react-icons/bs";
import pdf from "../assets/docs/Resume.pdf";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;


const Resume = () => {
  const[wid, setwid]=useState<number>(window.innerWidth);
  const [numPages, setNumPages] = useState<number>(0);
  const { t } = useTranslation();

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const handleResize=()=>{
    setwid(window.innerWidth);
  }

  window.addEventListener("load", handleResize);
  window.addEventListener("resize", handleResize);

  return (
    <div className='ResumePage'>
      <Document file={pdf} className="resumeview" onLoadSuccess={onDocumentLoadSuccess}>
        <div className="resume-container">
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} scale={wid<700 ? ( wid>475? 0.7: 0.5): 1}/>
          ))}
        </div>
      </Document>

      <a href={pdf} target='_blank' download="Ahmet's Resume" rel="noreferrer">
        <button className='downloadCV' type='button'>
          <h3><BsDownload/>&nbsp; {t('Resume.Download')}</h3>
        </button>
      </a>

    </div>
  )
}

export default Resume