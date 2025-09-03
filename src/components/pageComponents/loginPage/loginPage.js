import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

// Social logos
const GoogleLogo = "/image/google-logo.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in:", email, password);

    // 👉 redirect after login
    navigate("/myculture");
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);

    // 👉 redirect for social login too
    navigate("/myculture");
  };

  return (
    <PageContainer>
      <LoginPageWrapper>
        <LoginForm onSubmit={handleSubmit}>
          <Title>Login to Unipath</Title>

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

          <div style={{ textAlign: "center", color: "#6b7280", margin: "15px 0" }}>or</div>

          <SocialButton bgColor="#ff2600ff" onClick={() => handleSocialLogin("Google")}>
            <img src={GoogleLogo} alt="Google" /> Sign in with Google
          </SocialButton>

          <RegisterLink>
            Don't have an account? <Link to="/register">Register</Link>
          </RegisterLink>
        </LoginForm>
      </LoginPageWrapper>
    </PageContainer>
  );
};

export default LoginPage;
