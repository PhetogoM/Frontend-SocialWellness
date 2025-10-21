import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import './CommunicationSkillsPage.css';

const CommunicationSkillsPage = () => {
  const [seeMoreCategories, setSeeMoreCategories] = useState({});

  const categories = {
    'Learning to understand others': [
      { id: 1, title: 'Active Listening Techniques', videoId: 'Yq5pJ0q3xuc' },
      { id: 2, title: 'Reading Body Language', videoId: '4jwUXV4QaTw' },
      { id: 3, title: 'Empathy in Communication', videoId: 'pi86Nr9Mdms', start: 470 },
      { id: 4, title: 'Understanding Different Perspectives', videoId: 'iueVZJVEmEs' }
    ],

    'Express yourself with clarity': [
      { id: 5, title: 'Speaking with Confidence', videoId: 'eVFzbxmKNUw' },
      { id: 6, title: 'Structuring Your Thoughts', videoId: 'Z_z-QOagXZU' },
      { id: 7, title: 'Effective Presentation Skills', videoId: 'yoD8RMq2OkU' },
      { id: 8, title: 'Writing Clear Messages', videoId: 'prUqCd2R3Zw', start: 20 }
    ]
  };

  const toggleSeeMore = (category) => {
    setSeeMoreCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
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

          return (
            <div key={category} className={`category-card`}>
              <h2 className="category-title">{category}</h2>

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

              {restVideos.length > 0 && !seeMore && (
                <button
                  className={`see-more-button ${seeMore ? 'expanded' : ''}`}
                  onClick={() => toggleSeeMore(category)}
                >
                  See More <ChevronRight size={20} />
                </button>
              )}

              {seeMore && (
                <>
                  {restVideos.map((video) => (
                    <div key={video.id} className="video-card">
                      <h3>{video.title}</h3>
                      <div className="video-iframe">
                        <iframe
                          src={`https://www.youtube.com/embed/${video.videoId}${video.start ? `?start=${video.start}` : ''}`}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  ))}

                  <button
                    className="see-more-button"
                    onClick={() => toggleSeeMore(category)}
                  >
                    See Less <ChevronDown size={20} />
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommunicationSkillsPage;
