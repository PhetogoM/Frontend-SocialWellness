import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

      // ✅ use modular API method
      const data = await authAPI.login(email, password);

      const user = data.user || { email, role: "user" };
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);

      // ✅ navigate based on role
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
    navigate("/myculture");
  };

  return (
    <PageContainer>
      <LoginForm onSubmit={handleSubmit}>
        <Title>Login to Unipath</Title>

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

        <div
          style={{ textAlign: "center", color: "#6b7280", margin: "15px 0" }}
        >
          or
        </div>

        <SocialButton
          bgColor="#ff2600ff"
          onClick={() => handleSocialLogin("Google")}
        >
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
