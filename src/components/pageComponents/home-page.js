import React from 'react';
import '../stylesheets/home.css';

const Home = () => {
  return (
    <div>
      <h1>This is the Frontend homepage</h1>
      <hr />
      <p>We are yet to bring this site to life...</p>
      <br />
      <h3>You will experience our elegant and responsive code in due time ;-)</h3>
      <p>Here's what to look out for:</p>
      <br />
      <ol style={{ listStyleType: 'upper-roman' }}>
          <li>
              <h2 className="Bold"><u>Academic Support & Resource Sharing</u></h2>
              <ul>
                  <li>Access notes, study guides, and practical study tips from your peers</li>
                  <li>Join chatrooms by faculty, course, or specific academic interests</li>
                  <li>Benefit from first-hand advice on planning, adjustment, and effective learning</li>
                  
              </ul>
          </li>

          <li>
              <h2><u>Social Connection & Campus Life</u></h2>
              <ul>
                  <li>Participate in open peer chatrooms to build friendships and reduce isolation</li>
                  <li>Share and discover advice on navigating campus services and social events</li>
                  <li>Foster a sense of community across faculties</li>
                  
              </ul>
          </li>

          <li>
              <h2><u>Peer-Powered Mentorship</u></h2>
              <ul>
                  <li>Learn from experienced students who guide first-years</li>
                  <li>Tap into a culture of knowledge sharing and collaborative learning</li>
                  <li>Promote a sense of belonging while gaining practical insights</li>
                  
              </ul>
          </li>

          <li>
              <h2><u>Platform Design & Experience</u></h2>
              <ul>
                  <li>Fully responsive design for seamless use on any device</li>
                  <li>Clean, calming visual theme to enhance focus and usability</li>
                  <li>Intuitive navigation for a smooth and enjoyable experience</li>
                  
              </ul>
          </li>
      </ol>

      <footer>
          <h3>We hope you're excited for what's to come!</h3>
          <p>© 2025 Uni-Path. All Rights Reserved. | Developed by Uni-Path FrontEnd</p>        
      </footer>
    </div>
    
    
  );
};

export default Home;
