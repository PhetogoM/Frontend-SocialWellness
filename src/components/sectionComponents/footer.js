import React from 'react';

const Footer = () => {
  return (
    <div>
      <div className="copyrights">
        <p>
			FRONTEND TEMPLATE FOOTER<br/>
          &copy; {new Date().getFullYear()} Business-Name. All Rights Reserved. | Developed by Development-Group-Name
        </p>
      </div>
    </div>
  );
};

export default Footer;
