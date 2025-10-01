import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const CommunicationSkillsPage = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const categories = {
    'Learning to understand others': [
      { id: 1, title: 'Active Listening Techniques', videoId: 'dQw4w9WgXcQ' },
      { id: 2, title: 'Reading Body Language', videoId: 'dQw4w9WgXcQ' },
      { id: 3, title: 'Empathy in Communication', videoId: 'dQw4w9WgXcQ' },
      { id: 4, title: 'Understanding Different Perspectives', videoId: 'dQw4w9WgXcQ' }
    ],
    'Express yourself with clarity': [
      { id: 5, title: 'Speaking with Confidence', videoId: 'dQw4w9WgXcQ' },
      { id: 6, title: 'Structuring Your Thoughts', videoId: 'dQw4w9WgXcQ' },
      { id: 7, title: 'Effective Presentation Skills', videoId: 'dQw4w9WgXcQ' },
      { id: 8, title: 'Writing Clear Messages', videoId: 'dQw4w9WgXcQ' }
    ]
  };

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
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
                      }}>{video.title}</h3>
                      <div style={{
                        position: 'relative',
                        paddingBottom: '56.25%',
                        height: 0,
                        overflow: 'hidden',
                        borderRadius: '6px',
                        background: '#e3f2fd'
                      }}>
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          textAlign: 'center'
                        }}>
                          <div style={{
                            width: '80px',
                            height: '80px',
                            background: '#ff0000',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 10px'
                          }}>
                            <div style={{
                              width: 0,
                              height: 0,
                              borderLeft: '25px solid white',
                              borderTop: '15px solid transparent',
                              borderBottom: '15px solid transparent',
                              marginLeft: '5px'
                            }}></div>
                          </div>
                          <p style={{
                            color: '#666',
                            fontSize: '0.9rem'
                          }}>Video Player Placeholder</p>
                        </div>
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