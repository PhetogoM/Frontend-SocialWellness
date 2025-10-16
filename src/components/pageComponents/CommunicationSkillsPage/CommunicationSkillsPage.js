import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import './CommunicationSkillsPage.css';

const CommunicationSkillsPage = () => {
  const [seeMoreCategories, setSeeMoreCategories] = useState({});

  const categories = {
    'Learning to understand others': [
      { id: 1, title: 'Active Listening Techniques', videoId: 'Yq5pJ0q3xuc' },
      { id: 2, title: 'Reading Body Language', videoId: '4jwUXV4QaTw' },
      { id: 3, title: 'Empathy in Communication', videoId: 'pi86Nr9Mdms&t=470s' },
      { id: 4, title: 'Understanding Different Perspectives', videoId: 'iueVZJVEmEs' }
    ],
    'Express yourself with clarity': [
      { id: 5, title: 'Speaking with Confidence', videoId: 'eVFzbxmKNUw' },
      { id: 6, title: 'Structuring Your Thoughts', videoId: 'Z_z-QOagXZU' },
      { id: 7, title: 'Effective Presentation Skills', videoId: 'yoD8RMq2OkU' },
      { id: 8, title: 'Writing Clear Messages', videoId: 'prUqCd2R3Zw&t=20s' }
    ]
  };

  const toggleSeeMore = (category) => {
    setSeeMoreCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <div className="communication-container">
      <h1 className="communication-title">Communication Skills</h1>
      <p className="communication-subtitle">
        Develop essential communication skills to connect better with others and express yourself effectively
      </p>

      <div className="communication-wrapper">
        {Object.keys(categories).map((category, index) => {
          const videos = categories[category];
          const firstVideo = videos[0];
          const restVideos = videos.slice(1);
          const seeMore = seeMoreCategories[category];

          // Determine color class: first category red, second green
          const colorClass = index % 2 === 0 ? 'red' : 'green';

          return (
            <div key={category} className={`category-card ${colorClass}`}>
              {/* Category Heading */}
              <h2 className="category-title">{category}</h2>

              {/* First video always visible */}
              <div className="video-subheading">
                <h3>{firstVideo.title}</h3>
                <div className="video-iframe">
                  <iframe
                    src={`https://www.youtube.com/embed/${firstVideo.videoId}`}
                    title={firstVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              {/* See More button for remaining videos */}
              {restVideos.length > 0 && (
                <button
                  className={`see-more-button ${seeMore ? 'expanded' : ''}`}
                  onClick={() => toggleSeeMore(category)}
                >
                  {seeMore ? 'See Less' : 'See More'}
                  {seeMore ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
              )}

              {/* Remaining videos */}
              {seeMore && restVideos.map(video => (
                <div key={video.id} className="video-card">
                  <h3>{video.title}</h3>
                  <div className="video-iframe">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.videoId}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommunicationSkillsPage;
