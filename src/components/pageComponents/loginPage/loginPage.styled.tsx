import styled from 'styled-components';

export const LoginPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f2;
`;

export const LoginForm = styled.form`
  background-color: #fff;
  padding: 48px 36px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  width: 360px;
`;

export const Title = styled.h2`
  margin-bottom: 24px;
  text-align: center;
  font-weight: 500;
  color: #202124;
  font-family: 'Roboto', sans-serif;
`;

export const Input = styled.input`
  padding: 14px 12px;
  margin-bottom: 20px;
  font-size: 16px;
  border: 1px solid #dadce0;
  border-radius: 4px;
  outline: none;
  font-family: 'Roboto', sans-serif;
  transition: border 0.2s;

  &:focus {
    border-color: #4285f4;
    box-shadow: 0 1px 3px rgba(66, 133, 244, 0.3);
  }
`;

export const Button = styled.button`
  background-color: #1a73e8;
  color: white;
  padding: 12px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  transition: background 0.2s, box-shadow 0.2s;

  &:hover {
    background-color: #1669c1;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }

  &:active {
    background-color: #155ab6;
    box-shadow: 0 1px 2px rgba(0,0,0,0.2);
  }
`;
