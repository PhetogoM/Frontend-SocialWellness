import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  PageContainer,
  RegisterPageWrapper,
  RegisterForm,
  Input,
  Button,
  Title,
  SocialButton,
  LoginLink,
} from "./RegisterPage.styled.js";

// Social logos
const GoogleLogo = "/image/google-logo.png";
const MicrosoftLogo = "/image/microsoft-logo.png";
const AppleLogo = "/image/apple-logo.png";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registering:", name, email, password);
  };

  const handleSocialRegister = (provider) => {
    console.log(`Registering with ${provider}`);
  };

  return (
     <PageContainer>
      <RegisterPageWrapper>
        <RegisterForm onSubmit={handleSubmit}>
          <Title>Register to Unipath</Title>

          <SocialButton bgColor="#4285F4" onClick={() => handleSocialRegister("Google")}>
            <img src={GoogleLogo} alt="Google" /> Sign up with Google
          </SocialButton>

          <SocialButton bgColor="#0078D4" onClick={() => handleSocialRegister("Microsoft")}>
            <img src={MicrosoftLogo} alt="Microsoft" /> Sign up with Microsoft
          </SocialButton>

          <SocialButton bgColor="#000000" onClick={() => handleSocialRegister("Apple")}>
            <img src={AppleLogo} alt="Apple" /> Sign up with Apple
          </SocialButton>

          <div style={{ textAlign: "center", color: "#6b7280", margin: "15px 0" }}>or</div>

          {/* Name input field */}
          <Input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <Button type="submit">Register</Button>

          <LoginLink>
            Already have an account? <Link to="/login">Login</Link>
          </LoginLink>
        </RegisterForm>
      </RegisterPageWrapper>
    </PageContainer>
  );
};

export default RegisterPage;
