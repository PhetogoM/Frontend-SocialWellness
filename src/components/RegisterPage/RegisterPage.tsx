import React, { FC } from 'react';
import { RegisterPageWrapper } from './RegisterPage.styled';

interface RegisterPageProps {}

const RegisterPage: FC<RegisterPageProps> = () => (
 <RegisterPageWrapper data-testid="RegisterPage">
    RegisterPage Component
 </RegisterPageWrapper>
);

export default RegisterPage;
