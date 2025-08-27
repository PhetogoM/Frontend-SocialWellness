import styled from "styled-components";

export const RegisterPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9fafb;
`;

export const RegisterForm = styled.form`
  background-color: #ffffff;
  padding: 48px 36px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  width: 380px;
`;

export const Title = styled.h2`
  margin-bottom: 24px;
  text-align: center;
  font-weight: 500;
  color: #1f2937;
  font-family: "Roboto", sans-serif;
`;

export const Input = styled.input`
  padding: 14px 12px;
  margin-bottom: 20px;
  font-size: 16px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  outline: none;
  font-family: "Roboto", sans-serif;
  transition: border 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: #16a34a; /* green focus for register */
    box-shadow: 0 1px 3px rgba(22, 163, 74, 0.3);
  }
`;

export const Button = styled.button`
  background-color: #16a34a; /* green button */
  color: white;
  padding: 12px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  transition: background 0.2s, box-shadow 0.2s;

  &:hover {
    background-color: #138a3d;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  }

  &:active {
    background-color: #0f6b30;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  }
`;

export const SocialButton = styled.button<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  color: white;
  padding: 10px;
  margin-bottom: 12px;
  font-size: 15px;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Roboto", sans-serif;
  transition: background 0.2s;

  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  &:hover {
    filter: brightness(0.9);
  }
`;

export const LoginLink = styled.p`
  margin-top: 16px;
  text-align: center;
  font-size: 14px;
  color: #6b7280;

  a {
    color: #16a34a;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;
