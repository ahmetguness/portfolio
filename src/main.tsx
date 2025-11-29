import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BlogProvider } from "./data/BlogContext";
import { ProjectProvider } from "./data/ProjectContext";
import { AboutProvider } from "./data/AboutContext";
import { HeroProvider } from "./data/HeroContext";
import { ProjectsSectionProvider } from "./data/ProjectsSectionContext";
import { BlogSectionProvider } from "./data/BlogSectionContext";
import { ContactSectionProvider } from "./data/ContactSectionContext";

const TitleHandler = () => {
  useEffect(() => {
    const originalTitle = document.title;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "👋 Hey, I'm here!";
      } else {
        document.title = originalTitle;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TitleHandler />

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
  </React.StrictMode>
);
