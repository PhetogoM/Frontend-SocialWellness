import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import './AboutPage.css';

const AboutPage = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const cultures = {
    'Zulu': [
      { id: 1, title: 'Welcome to University - Zulu Perspective', videoId: 'dQw4w9WgXcQ' },
      { id: 2, title: 'Study Tips from Zulu Students', videoId: 'dQw4w9WgXcQ' },
      { id: 3, title: 'Campus Life and Zulu Culture', videoId: 'dQw4w9WgXcQ' }
    ],
    'Sotho': [
      { id: 4, title: 'Navigating University as a Sotho Student', videoId: 'dQw4w9WgXcQ' },
      { id: 5, title: 'Balancing Culture and Campus Life', videoId: 'dQw4w9WgXcQ' }
    ],
    'Sepedi': [
      { id: 6, title: 'First Year Tips - Sepedi Edition', videoId: 'dQw4w9WgXcQ' },
      { id: 7, title: 'Finding Your Community on Campus', videoId: 'dQw4w9WgXcQ' }
    ],
    'Setswana': [
      { id: 8, title: 'University Guide for Setswana Speakers', videoId: 'dQw4w9WgXcQ' },
      { id: 9, title: 'Academic Success Stories', videoId: 'dQw4w9WgXcQ' }
    ],
    'Xhosa': [
      { id: 10, title: 'Xhosa Students Share Their Journey', videoId: 'dQw4w9WgXcQ' },
      { id: 11, title: 'Campus Resources and Support', videoId: 'dQw4w9WgXcQ' }
    ],
    'Tsonga': [
      { id: 12, title: 'First Year Essentials - Tsonga Perspective', videoId: 'dQw4w9WgXcQ' },
      { id: 13, title: 'Making Friends at University', videoId: 'dQw4w9WgXcQ' }
    ],
    'Venda': [
      { id: 14, title: 'Venda Culture on Campus', videoId: 'dQw4w9WgXcQ' },
      { id: 15, title: 'Study Strategies for Success', videoId: 'dQw4w9WgXcQ' }
    ],
    'English': [
      { id: 16, title: 'Getting Started at University', videoId: 'dQw4w9WgXcQ' },
      { id: 17, title: 'Campus Life Overview', videoId: 'dQw4w9WgXcQ' }
    ],
    'Afrikaans': [
      { id: 18, title: 'Universiteit vir Eerstejaarstudente', videoId: 'dQw4w9WgXcQ' },
      { id: 19, title: 'Kampuslewe en Ondersteuning', videoId: 'dQw4w9WgXcQ' }
    ]
  };

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <div className="aboutpage-root">
      <div className="aboutpage-container">
        <header className="aboutpage-header">
          <h1 className="aboutpage-title">About</h1>
          <p className="aboutpage-description">
            Explore the university environment and its surrounding communities with guidance that illuminates diverse cultural backgrounds you may encounter
          </p>
        </header>

        <div className="aboutpage-content">
          <div className="aboutpage-divider"></div>

          {Object.keys(cultures).sort().map((culture) => (
            <div key={culture} className="aboutpage-culture-card">
              <button
                onClick={() => toggleCategory(culture)}
                className={`aboutpage-culture-btn${expandedCategory === culture ? ' expanded' : ''}`}
              >
                <span>Check out my culture - {culture}</span>
                {expandedCategory === culture ? 
                  <ChevronDown size={24} /> : 
                  <ChevronRight size={24} />
                }
              </button>

              {expandedCategory === culture && (
                <div className="aboutpage-videos">
                  {cultures[culture].map((video) => (
                    <div key={video.id} className="aboutpage-video-card">
                      <h3 className="aboutpage-video-title">{video.title}</h3>
                      <div className="aboutpage-video-placeholder">
                        <div className="aboutpage-video-icon">
                          <div className="aboutpage-video-play"></div>
                        </div>
                        <p className="aboutpage-video-text">Video Player Placeholder</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <footer className="aboutpage-footer">
          <p>UniPath - Helping you navigate your first year with confidence</p>
        </footer>
      </div>
    </div>
  );
};

export default AboutPage;