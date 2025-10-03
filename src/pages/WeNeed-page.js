import React, { useState } from 'react';
import { Send } from 'lucide-react';

export default function WeNeedPage() {
  const [request, setRequest] = useState('');
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [submittedRequests, setSubmittedRequests] = useState([]);

  const characterLimit = 250;

  const categories = [
    'Clubs',
    'Sports',
    'Events',
    'Cultural Activities',
    'Facilities',
    'Support Services',
    'Other'
  ];

  const handleSubmit = () => {
    if (request.trim() && category) {
      const newRequest = {
        id: Date.now(),
        name: name.trim() || 'Anonymous',
        category,
        request: request.trim(),
        date: 'Just now',
        likes: 0,
        liked: false
      };
      setSubmittedRequests(prev => [newRequest, ...prev]);
      setRequest('');
      setCategory('');
      setName('');
      setStudentNumber('');
    }
  };

  const handleLike = (requestId) => {
    setSubmittedRequests(prev =>
      prev.map(req =>
        req.id === requestId
          ? {
              ...req,
              liked: !req.liked,
              likes: Math.max(0, req.likes + (req.liked ? -1 : 1))
            }
          : req
      )
    );
  };

  return (
    <div
      style={{
        width: '100vw',
        marginLeft: 'calc(50% - 50vw)',
        marginRight: 'calc(50% - 50vw)',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #d4f4d4 0%, #80EF80 100%)',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: '40px 20px'
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1
            style={{
              color: '#000000',
              fontSize: '2.5rem',
              marginBottom: '10px',
              fontWeight: '700'
            }}
          >
            #WeNeed
          </h1>
          <p
            style={{
              color: '#000000',
              fontSize: '1.1rem',
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            Share what social activities, clubs, or support you need on campus
          </p>
        </header>

        <div
          style={{
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '30px',
            marginBottom: '30px'
          }}
        >
          <h2
            style={{
              color: '#000000',
              fontSize: '1.3rem',
              marginBottom: '20px',
              fontWeight: '600'
            }}
          >
            Submit Your Request
          </h2>

          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                color: '#000000',
                marginBottom: '8px',
                fontWeight: '500'
              }}
            >
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Leave blank to post anonymously"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #80EF80',
                borderRadius: '6px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                color: '#000000',
                marginBottom: '8px',
                fontWeight: '500'
              }}
            >
              Student Number
            </label>
            <input
              type="text"
              value={studentNumber}
              onChange={(e) => setStudentNumber(e.target.value)}
              placeholder="Enter your student number"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #80EF80',
                borderRadius: '6px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                color: '#000000',
                marginBottom: '8px',
                fontWeight: '500'
              }}
            >
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #80EF80',
                borderRadius: '6px',
                fontSize: '1rem',
                boxSizing: 'border-box',
                cursor: 'pointer'
              }}
            >
              <option value="">Select a category...</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                color: '#000000',
                marginBottom: '8px',
                fontWeight: '500'
              }}
            >
              What do you need? *
            </label>
            <textarea
              value={request}
              onChange={(e) =>
                setRequest(e.target.value.slice(0, characterLimit))
              }
              placeholder="Tell us what you need..."
              required
              rows="4"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #80EF80',
                borderRadius: '6px',
                fontSize: '1rem',
                boxSizing: 'border-box',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
            />
            <div
              style={{
                textAlign: 'right',
                color: request.length >= characterLimit ? '#d32f2f' : '#666',
                fontSize: '0.9rem',
                marginTop: '5px'
              }}
            >
              {request.length}/{characterLimit} characters
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!request.trim() || !category}
            style={{
              background: !request.trim() || !category ? '#ccc' : '#80EF80',
              color: 'white',
              padding: '12px 30px',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor:
                !request.trim() || !category ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background 0.3s ease'
            }}
            onMouseOver={(e) => {
              if (request.trim() && category) {
                e.currentTarget.style.background = '#6bd96b';
              }
            }}
            onMouseOut={(e) => {
              if (request.trim() && category) {
                e.currentTarget.style.background = '#80EF80';
              }
            }}
          >
            <Send size={18} />
            Submit Request
          </button>
        </div>

        <div
          style={{
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '30px'
          }}
        >
          <h2
            style={{
              color: '#000000',
              fontSize: '1.3rem',
              marginBottom: '20px',
              fontWeight: '600'
            }}
          >
            Community Requests
          </h2>

          {submittedRequests.map((req) => (
            <div
              key={req.id}
              style={{
                padding: '20px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                marginBottom: '15px',
                background: '#fafafa'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '10px',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}
              >
                <div>
                  <span
                    style={{
                      color: '#000000',
                      fontWeight: '600',
                      marginRight: '10px'
                    }}
                  >
                    {req.name}
                  </span>
                  <span
                    style={{
                      background: '#80EF80',
                      color: 'white',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '0.85rem',
                      fontWeight: '500'
                    }}
                  >
                    {req.category}
                  </span>
                </div>
                <span
                  style={{
                    color: '#666',
                    fontSize: '0.9rem'
                  }}
                >
                  {req.date}
                </span>
              </div>
              <p
                style={{
                  color: '#000000',
                  margin: '0 0 15px 0',
                  lineHeight: '1.6'
                }}
              >
                {req.request}
              </p>
              <button
                type="button"
                onClick={() => handleLike(req.id)}
                style={{
                  background: req.liked ? '#80EF80' : 'white',
                  color: req.liked ? 'white' : '#000000',
                  border: '2px solid #80EF80',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.3s ease'
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>👍</span>
                <span>{req.likes}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
