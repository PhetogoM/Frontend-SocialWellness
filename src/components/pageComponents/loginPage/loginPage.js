import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  PageContainer,
  LoginPageWrapper,
  LoginForm,
  Input,
  Button,
  Title,
  SocialButton,
  RegisterLink,
} from "./loginPage.styled.js";

// Social logos .if error just load the custom.d.ts file in source remove it
const GoogleLogo = "/image/google-logo.png";
const MicrosoftLogo = "/image/microsoft-logo.png";
const AppleLogo = "/image/apple-logo.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in:", email, password);
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
  };

  return (
    <PageContainer>
        <LoginPageWrapper>
        <LoginForm onSubmit={handleSubmit}>
          <Title>Login to Unipath</Title>

          <SocialButton bgColor="#4285F4" onClick={() => handleSocialLogin("Google")}>
            <img src={GoogleLogo} alt="Google" /> Sign in with Google
          </SocialButton>

          <SocialButton bgColor="#0078D4" onClick={() => handleSocialLogin("Microsoft")}>
            <img src={MicrosoftLogo} alt="Microsoft" /> Sign in with Microsoft
          </SocialButton>

          <SocialButton bgColor="#000000" onClick={() => handleSocialLogin("Apple")}>
            <img src={AppleLogo} alt="Apple" /> Sign in with Apple
          </SocialButton>

          <div style={{ textAlign: "center", color: "#6b7280", margin: "15px 0" }}>or</div>

          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit">Login</Button>

          <RegisterLink>
            Don't have an account? <Link to="/register">Register</Link>
          </RegisterLink>
        </LoginForm>
      </LoginPageWrapper>
    </PageContainer>
  );
};

export default LoginPage;
