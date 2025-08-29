import React from "react";
import styled from "styled-components";


/* Footer container */
const FooterContainer = styled.footer`
  background-color: #60a5fa; /* medium blue */
  color: white;
  text-align: center;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;


const Footer = () => {
  return (
    <FooterContainer>
      <div>
        &copy; {new Date().getFullYear()} Unipath. All Rights Reserved.
      </div>
    </FooterContainer>
  );
};

export default Footer;
