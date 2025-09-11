import styled from "styled-components";

export const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;

  /* Background image from public folder */
  background-image: url(${process.env.PUBLIC_URL + "puvblic/image/hero-bg.png"});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  /* Overlay for opacity effect */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.4);
    z-index: 0;
  }

  /* Make sure children are above overlay */
  > * {
    position: relative;
    z-index: 1;
  }
`;
