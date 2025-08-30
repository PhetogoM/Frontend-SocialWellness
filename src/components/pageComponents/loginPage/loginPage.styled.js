import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh; /* adjust as needed */
  background: url('/image/hero-bg.png') no-repeat center center;
  background-size: cover;
`;

export const LoginPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9fafb;
`;

export const LoginForm = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #5fae8a;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #5fae8a;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #5fae8a;
  }
`;

export const SocialButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  background-color: ${(props) => props.bgColor || "#ccc"};
  color: white;

  img {
    width: 20px;
    height: 20px;
  }
`;

export const RegisterLink = styled.div`
  margin-top: 1rem;
  text-align: center;
  color: #6b7280;

  a {
    color: #5fae8a;
    font-weight: bold;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
