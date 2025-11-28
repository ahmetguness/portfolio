import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BlogProvider } from './data/BlogContext'
import { ProjectProvider } from './data/ProjectContext'
import { AboutProvider } from './data/AboutContext'
import { HeroProvider } from './data/HeroContext'
import { ProjectsSectionProvider } from './data/ProjectsSectionContext'
import { BlogSectionProvider } from './data/BlogSectionContext'
import { ContactSectionProvider } from './data/ContactSectionContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BlogProvider>
      <ProjectProvider>
        <AboutProvider>
          <HeroProvider>
            <ProjectsSectionProvider>
              <BlogSectionProvider>
                <ContactSectionProvider>
                  <App />
                </ContactSectionProvider>
              </BlogSectionProvider>
            </ProjectsSectionProvider>
          </HeroProvider>
        </AboutProvider>
      </ProjectProvider>
    </BlogProvider>
  </React.StrictMode>,
)
