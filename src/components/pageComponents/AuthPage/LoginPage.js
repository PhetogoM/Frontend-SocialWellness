import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { authAPI } from "../../apiComponents/authApi.js";
import {
  PageContainer,
  AuthForm as LoginForm,
  Input,
  Button,
  Title,
  SocialButton,
  RegisterLink,
} from "./AuthForm.styled.js";

const GoogleLogo = "/image/google-logo.png";

const LoginPage = ({ setUser }) => {
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

      const data = await authAPI.login(email, password);

      let user;
      if (data.user) {
        user = data.user;
      } else {
        try {
          user = await authAPI.getUser();
        } catch (fetchError) {
          console.error("Failed to fetch user profile:", fetchError);
          user = { email };
        }
      }

      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = () => {
    const dummyUser = {
      first_name: "Social",
      last_name: "User",
      email: "socialuser@gmail.com",
      role: "user",
    };
    localStorage.setItem("user", JSON.stringify(dummyUser));
    localStorage.setItem("access_token", "dummy_token");
    setUser(dummyUser);
    navigate("/");
  };

  return (
    <PageContainer>
      {/* 🌐 SEO Metadata */}
      <Helmet>
        <title>Login | UniPath</title>
        <meta name="description" content="Login to UniPath to access your student dashboard, cultural posts, and community features." />
        <meta name="keywords" content="UniPath login, student portal, cultural posts, register, authentication" />
        <meta property="og:title" content="Login | UniPath" />
        <meta property="og:description" content="Login to UniPath to access your student dashboard, cultural posts, and community features." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/login" />
      </Helmet>

      <LoginForm onSubmit={handleSubmit}>
        <Title>Login to UniPath</Title>
        {error && (
          <div style={{ color: "red", marginBottom: "10px" }}>
            {error.split("\n").map((line, idx) =>
              line.trim() ? <div key={idx}>{line}</div> : null
            )}
          </div>
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

        <SocialButton bgColor="#ff2600ff" onClick={handleSocialLogin}>
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
