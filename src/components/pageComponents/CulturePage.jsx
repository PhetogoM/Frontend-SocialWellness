import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const MyCulturePage = () => {
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
          }}>MyCulture</h1>
          <p style={{
            color: '#000000',
            fontSize: '1.1rem',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Explore the university environment and its surrounding communities with guidance that illuminates diverse cultural backgrounds you may encounter
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

          {Object.keys(cultures).sort().map((culture) => (
            <div key={culture} style={{
              marginBottom: '15px',
              border: '1px solid #80EF80',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <button
                onClick={() => toggleCategory(culture)}
                style={{
                  width: '100%',
                  padding: '18px 20px',
                  background: expandedCategory === culture ? '#80EF80' : '#e8f8e8',
                  border: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: expandedCategory === culture ? 'white' : '#000000'
                }}
              >
                <span>Check out my culture - {culture}</span>
                {expandedCategory === culture ? 
                  <ChevronDown size={24} /> : 
                  <ChevronRight size={24} />
                }
              </button>

              {expandedCategory === culture && (
                <div style={{
                  padding: '20px',
                  background: '#fafafa'
                }}>
                  {cultures[culture].map((video) => (
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

        <footer style={{
          textAlign: 'center',
          color: '#558b2f',
          fontSize: '0.9rem',
          marginTop: '30px'
        }}>
          <p>UniPath - Helping you navigate your first year with confidence</p>
        </footer>
      </div>
    </div>
  );
};

export default MyCulturePage;