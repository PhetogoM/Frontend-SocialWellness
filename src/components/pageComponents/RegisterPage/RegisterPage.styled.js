import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh; /* adjust as needed */
  background: url('/image/hero-bg.png') no-repeat center center;
  background-size: cover;
`;

export const RegisterPageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f4f6;
  font-family: Arial, sans-serif;
`;

export const RegisterForm = styled.form`
  background-color: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Title = styled.h2`
  text-align: center;
  color: #3b82f6;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  outline: none;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
`;

export const Button = styled.button`
  padding: 12px;
  background-color: #3b82f6;
  color: white;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: #2563eb;
  }
`;

export const SocialButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  padding: 10px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  background-color: ${(props) => props.bgColor || "#ccc"};
  color: white;

  &:hover {
    opacity: 0.9;
  }

  img {
    width: 20px;
    height: 20px;
  }
`;

export const LoginLink = styled.p`
  text-align: center;
  color: #6b7280;
  margin-top: 10px;

  a {
    color: #3b82f6;
    font-weight: bold;
  }
`;
