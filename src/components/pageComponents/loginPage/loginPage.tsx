import React, { FC } from 'react';
import { LoginPageWrapper } from './loginPage.styled';

interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = () => (
  <LoginPageWrapper data-testid="loginPage">
    LoginPage Component
  </LoginPageWrapper>
);

export default LoginPage;