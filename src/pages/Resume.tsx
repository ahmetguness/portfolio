import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BsDownload } from "react-icons/bs";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;


const Resume = () => {
  const [wid, setwid] = useState<number>(window.innerWidth);
  const [numPages, setNumPages] = useState<number>(0);
  const { t, i18n } = useTranslation();

  const [resumeUrls, setResumeUrls] = useState<{ en: string, tr: string }>({ en: '', tr: '' });
  const [currentResume, setCurrentResume] = useState<string>('');
  const [displayUrl, setDisplayUrl] = useState<string>('');

  useEffect(() => {
    // Fetch Resume URLs
    const fetchSettings = async () => {
      try {
        const response = await fetch('http://localhost:4001/api/settings');
        const data = await response.json();
        setResumeUrls({
          en: data.resume_en || '',
          tr: data.resume_tr || ''
        });
      } catch (error) {
        console.error("Failed to fetch resume settings", error);
      }
    };
    fetchSettings();
  }, []);

  const getProcessedUrl = (url: string) => {
    if (!url) return '';
    // Ensure raw=1 for DropBox
    if (url.includes('dropbox.com') && url.includes('dl=0')) {
      return url.replace('dl=0', 'raw=1');
    }
    return url;
  };

  useEffect(() => {
    let rawUrl = '';
    if (i18n.language === 'tr') {
      rawUrl = getProcessedUrl(resumeUrls.tr);
    } else {
      rawUrl = getProcessedUrl(resumeUrls.en);
    }
    setCurrentResume(rawUrl);

    // Use proxy for display to avoid CORS
    if (rawUrl) {
      setDisplayUrl(`http://localhost:4001/api/proxy?url=${encodeURIComponent(rawUrl)}`);
    } else {
      setDisplayUrl('');
    }
  }, [i18n.language, resumeUrls]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const handleResize = () => {
    setwid(window.innerWidth);
  }

  window.addEventListener("load", handleResize);
  window.addEventListener("resize", handleResize);

  return (
    <div className='ResumePage'>
      {displayUrl ? (
        <>
          <Document file={displayUrl} className="resumeview" onLoadSuccess={onDocumentLoadSuccess}>
            <div className="resume-container">
              {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} scale={wid < 700 ? (wid > 475 ? 0.7 : 0.5) : 1} />
              ))}
            </div>
          </Document>

          <a href={currentResume} target='_blank' download={i18n.language === 'tr' ? "Ahmet_Gunes_Ozgecmis.pdf" : "Ahmet_Gunes_Resume.pdf"} rel="noreferrer">
            <button className='downloadCV' type='button'>
              <h3><BsDownload />&nbsp; {t('Resume.Download')}</h3>
            </button>
          </a>
        </>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '2rem', color: 'white' }}>
          Loading Resume...
        </div>
      )}
    </div>
  )
}

export default Resume