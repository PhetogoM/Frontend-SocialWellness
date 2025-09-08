import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../apiComponents/api.js";
import {
  PageContainer,
  LoginForm,
  Input,
  Button,
  Title,
  SocialButton,
  RegisterLink,
} from "./loginPage.styled.js";

const GoogleLogo = "/image/google-logo.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await api.post("api/token/", { username: email, password });

      // Save tokens + user info including role
      const user = res.data.user || { email }; // fallback if backend doesn't send user
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      localStorage.setItem("user", JSON.stringify(user));

      // Role-based redirect example
      if (user.role === "admin") {
        navigate("/admin-dashboard"); 
      } else {
        navigate("/myculture"); 
      }
    } catch (err) {
      console.error(err);
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    navigate("/myculture"); // placeholder
  };

  return (
    <PageContainer>
        <LoginForm onSubmit={handleSubmit}>
          <Title>Login to Unipath</Title>
          {error && <p style={{ color: "red" }}>{error}</p>}

          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <Button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>

          <div style={{ textAlign: "center", color: "#6b7280", margin: "15px 0" }}>or</div>
          <SocialButton bgColor="#ff2600ff" onClick={() => handleSocialLogin("Google")}>
            <img src={GoogleLogo} alt="Google" /> Sign in with Google
          </SocialButton>

          <RegisterLink>
            Don't have an account? <Link to="/register">Register</Link>
          </RegisterLink>
        </LoginForm>
    </PageContainer>
  );
};

export default LoginPage;
