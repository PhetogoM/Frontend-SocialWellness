import styled from 'styled-components';

export const LoginPageWrapper = styled.div`
 display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f6f8fa, #e9ebee);
`;

export const LoginForm = styled.form`
  background-color: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  width: 360px;
`;

export const Input = styled.input`
  padding: 12px;
  margin-bottom: 20px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border 0.3s;

  &:focus {
    border-color: #1976d2;
  }
`;

export const Button = styled.button`
  background-color: #1976d2;
  color: white;
  padding: 12px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);

  &:hover {
    background-color: #1565c0;
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0,0,0,0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 3px 4px rgba(0,0,0,0.1);
  }
`;

export const Title = styled.h2`
  margin-bottom: 24px;
  text-align: center;
  color: #333;
`;