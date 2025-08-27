import React, { useState, FC } from "react";
import { Link } from "react-router-dom";
import { RegisterPageWrapper, RegisterForm, Input, Button, Title, SocialButton, LoginLink } from "./RegisterPage.styled.tsx";

// Social logos (or use SVGs)
import GoogleLogo from "../assets/google-logo.png";
import MicrosoftLogo from "../assets/microsoft-logo.png";
import AppleLogo from "../assets/apple-logo.png";

const RegisterPage: FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registering:", name, email, password);
  };

  const handleSocialRegister = (provider: string) => {
    console.log(`Registering with ${provider}`);
  };

  return (
    <RegisterPageWrapper>
      <RegisterForm onSubmit={handleSubmit}>
        <Title>Create an account</Title>

        <SocialButton bgColor="#4285F4" onClick={() => handleSocialRegister("Google")}>
          <img src={GoogleLogo} alt="Google" /> Sign up with Google
        </SocialButton>

        <SocialButton bgColor="#0078D4" onClick={() => handleSocialRegister("Microsoft")}>
          <img src={MicrosoftLogo} alt="Microsoft" /> Sign up with Microsoft
        </SocialButton>

        <SocialButton bgColor="#000000" onClick={() => handleSocialRegister("Apple")}>
          <img src={AppleLogo} alt="Apple" /> Sign up with Apple
        </SocialButton>

        <div style={{ margin: "20px 0", textAlign: "center", color: "#6b7280" }}>or</div>

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
  );
};

export default RegisterPage;
