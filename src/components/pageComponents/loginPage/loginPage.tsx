import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { LoginPageWrapper } from './loginPage.styled';

interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = () => (
  <LoginPageWrapper data-testid="loginPage">
    <h2>Login Page</h2>
    
    <Link to="/">Go to Homepage</Link>
  </LoginPageWrapper>
);

export default LoginPage;