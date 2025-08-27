import React, { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="bg-gray-200 text-gray-700 py-4 text-center mt-auto shadow-inner">
      &copy; {new Date().getFullYear()} Unipath. All Rights Reserved.
    </footer>
  );
};

export default Footer;
