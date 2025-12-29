import React, { useEffect, useState } from 'react';
import { contentService } from '../services/contentService';
import { HomeContent } from '../types';

const HomeContentPage = () => {
  const [content, setContent] = useState<HomeContent | null>(null);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    const data = await contentService.get();
    setContent(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content) {
      await contentService.update(content);
      alert('Content saved!');
    }
  };

  if (!content) return <div>Loading...</div>;

  return (
    <div>
      <div className="admin-header">
        <h2>Home Content</h2>
      </div>
      <div className="admin-card">
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label>Hero Title</label>
            <input
              value={content.heroTitle}
              onChange={e => setContent({ ...content, heroTitle: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Hero Subtitle</label>
            <input
              value={content.heroSubtitle}
              onChange={e => setContent({ ...content, heroSubtitle: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>About Text</label>
            <textarea
              value={content.aboutText}
              onChange={e => setContent({ ...content, aboutText: e.target.value })}
              rows={5}
            />
          </div>
           <div className="form-group">
            <label>CTA Text</label>
            <input
              value={content.ctaText}
              onChange={e => setContent({ ...content, ctaText: e.target.value })}
            />
          </div>

          <h3>Social Links</h3>
          {content.socials.map((social, index) => (
            <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <input
                value={social.platform}
                onChange={e => {
                  const newSocials = [...content.socials];
                  newSocials[index].platform = e.target.value;
                  setContent({ ...content, socials: newSocials });
                }}
                placeholder="Platform"
                style={{ width: '150px' }}
              />
              <input
                value={social.url}
                onChange={e => {
                  const newSocials = [...content.socials];
                  newSocials[index].url = e.target.value;
                  setContent({ ...content, socials: newSocials });
                }}
                placeholder="URL"
                style={{ flex: 1 }}
              />
            </div>
          ))}

          <button type="submit" className="admin-btn btn-primary">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default HomeContentPage;
