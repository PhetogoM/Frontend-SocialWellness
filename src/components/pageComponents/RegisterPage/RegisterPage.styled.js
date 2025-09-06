import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* adjust as needed */
  background: url('/image/hero-bg.png') no-repeat center center;
  background-size: cover;
`;

export const RegisterForm = styled.form`
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  text-align: center;
  color: #5fae8a;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;

  &:focus {
    border-color: #5fae8a;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
`;

export const Button = styled.button`
  padding: 12px;
  background-color: #5fae8a;
  color: white;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: #5fae8a;
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
    color: #5fae8a;
    font-weight: bold;
  }
`;
