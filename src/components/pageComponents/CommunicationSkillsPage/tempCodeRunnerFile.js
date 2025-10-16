//import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
// 👈 STEP 1: ADD THE HOOK IMPORT BACK
import { useNavigate } from 'react-router-dom';

const CommunicationSkillsPage = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  // INITIALIZE THE NAVIGATE HOOK
  const navigate = useNavigate();
  
  // REPLACED 'VIDEO_ID_...'PLACEHOLDERS WITH YOUR ACTUAL YOUTUBE CODES
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

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };
  
  // ADD THE GO-BACK LOGIC
  const handleBackClick = () => {
    navigate(-1); // Go back one step in browser history
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #d4f4d4 0%, #80EF80 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        {/* BACK BUTTON (Now functional) */}
        <button
          onClick={handleBackClick}
          style={{
            background: 'transparent',
            border: '2px solid #000000',
            color: '#000000',
            padding: '8px 15px',
            borderRadius: '50px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            marginBottom: '20px',
            transition: 'background-color 0.3s, color 0.3s'
          }}
        >
          &larr; Back
        </button>
        
        <header style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <h1 style={{
            color: '#000000',
            fontSize: '2.5rem',
            marginBottom: '10px',
            fontWeight: '700'
          }}>Communication Skills</h1>
          <p style={{
            color: '#000000',
            fontSize: '1.1rem',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Develop essential communication skills to connect better with others and express yourself effectively
          </p>
        </header>

        <div style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '30px',
          marginBottom: '20px'
        }}>
          <div style={{
            marginBottom: '20px',
            paddingBottom: '15px',
            borderBottom: '2px solid #80EF80'
          }}>
          </div>

          {Object.keys(categories).map((category) => (
            <div key={category} style={{
              marginBottom: '15px',
              border: '1px solid #80EF80',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <button
                onClick={() => toggleCategory(category)}
                style={{
                  width: '100%',
                  padding: '18px 20px',
                  background: expandedCategory === category ? '#80EF80' : '#e8f8e8',
                  border: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: expandedCategory === category ? 'white' : '#000000'
                }}
              >
                <span>{category}</span>
                {expandedCategory === category ? 
                  <ChevronDown size={24} /> : 
                  <ChevronRight size={24} />
                }
              </button>

              {expandedCategory === category && (
                <div style={{
                  padding: '20px',
                  background: '#fafafa'
                }}>
                  {categories[category].map((video) => (
                    <div key={video.id} style={{
                      marginBottom: '25px',
                      background: 'white',
                      borderRadius: '8px',
                      padding: '15px',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                    }}>
                      <h3 style={{
                        color: '#000000',
                        fontSize: '1rem',
                        marginBottom: '12px',
                        fontWeight: '600'
                      }}>
                        {video.title}
                      </h3>
                      {/* NEW YOUTUBE IFRAME CODE (Replaces the old placeholder div) */}
                      <div style={{
                        position: 'relative',
                        paddingBottom: '56.25%', // 16:9 aspect ratio
                        height: 0,
                        overflow: 'hidden',
                        borderRadius: '6px',
                        background: '#000'
                      }}>
                        <iframe
                          // This line uses the videoId from the data structure
                          src={`https://www.youtube.com/embed/${video.videoId}`}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            border: 'none'
                          }}
                        ></iframe>
                      </div>
                      
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunicationSkillsPage;