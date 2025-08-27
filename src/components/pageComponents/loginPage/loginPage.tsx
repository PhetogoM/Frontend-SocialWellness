import React, { useState, FC } from "react";
import { Link } from "react-router-dom";
import { LoginPageWrapper, LoginForm, Input, Button, Title, SocialButton, RegisterLink } from "./loginPage.styled.tsx";

// Optionally, you can download logos or use svg icons
import GoogleLogo from "../../../assets/google-logo.png";
import MicrosoftLogo from "../../../assets/microsoft-logo.png";
import AppleLogo from "../../../assets/apple-logo.png";

const LoginPage: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in:", email, password);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Logging in with ${provider}`);
  };

  return (
    <LoginPageWrapper>
      <LoginForm onSubmit={handleSubmit}>
        <Title>Login in Unipath</Title>

        <SocialButton bgColor="#4285F4" onClick={() => handleSocialLogin("Google")}>
          <img src={GoogleLogo} alt="Google" /> Sign in with Google
        </SocialButton>

        <SocialButton bgColor="#0078D4" onClick={() => handleSocialLogin("Microsoft")}>
          <img src={MicrosoftLogo} alt="Microsoft" /> Sign in with Microsoft
        </SocialButton>

        <SocialButton bgColor="#000000" onClick={() => handleSocialLogin("Apple")}>
          <img src={AppleLogo} alt="Apple" /> Sign in with Apple
        </SocialButton>

        <div style={{ margin: "20px 0", textAlign: "center", color: "#6b7280" }}>or</div>

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
  );
};

export default LoginPage;
