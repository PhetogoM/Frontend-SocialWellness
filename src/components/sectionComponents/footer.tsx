import React, { FC } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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

/* Styled footer buttons (optional links) */
const FooterButton = styled(Link)`
  background-color: white;
  color: #3b82f6;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: bold;
  text-decoration: none;
  transition: background 0.2s;

  &:hover {
    background-color: #e0f2fe;
  }
`;

const Footer: FC = () => {
  return (
    <FooterContainer>
      <div>
        &copy; {new Date().getFullYear()} Unipath. All Rights Reserved.
      </div>
    </FooterContainer>
  );
};

export default Footer;
