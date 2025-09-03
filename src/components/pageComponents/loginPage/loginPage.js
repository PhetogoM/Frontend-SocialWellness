import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "/CMPG323/Frontend-SocialWellness/src/components/sectionComponents/api.js"; // ✅ import API instance
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

const GoogleLogo = "/image/google-logo.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔹 Email/password login
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await api.post("/auth/login", { email, password });

      if (res.data && res.data.token) {
        // ✅ Save user + token
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);

        navigate("/myculture");
      } else {
        setError("Invalid credentials.");
      }
    } catch (err) {
      console.error(err);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Google button login
  const handleSocialLogin = async (provider) => {
    try {
      setLoading(true);
      setError("");

      const res = await api.post(`/auth/${provider.toLowerCase()}`);

      if (res.data && res.data.token) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);

        navigate("/myculture");
      } else {
        setError("Social login failed.");
      }
    } catch (err) {
      console.error(err);
      setError("Social login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <LoginPageWrapper>
        <LoginForm onSubmit={handleSubmit}>
          <Title>Login to Unipath</Title>

          {error && (
            <p style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>
              {error}
            </p>
          )}

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
      </LoginPageWrapper>
    </PageContainer>
  );
};

export default LoginPage;
