import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../apiComponents/api.js";
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

const GoogleLogo = "/image/google-logo.png";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Register user
      await api.post("register/", { name, email, password });

      // Auto-login after registration
      const tokenRes = await api.post("token/", { username: email, password });

      const user = tokenRes.data.user || { name, email };
      localStorage.setItem("access_token", tokenRes.data.access);
      localStorage.setItem("refresh_token", tokenRes.data.refresh);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/myculture");
      }
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialRegister = (provider) => {
    console.log(`Registering with ${provider}`);
    navigate("/myculture"); // placeholder
  };

  return (
    <PageContainer>
      <RegisterPageWrapper>
        <RegisterForm onSubmit={handleSubmit}>
          <Title>Register to Unipath</Title>

          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* Name, Email, Password fields first */}
          <Input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <Button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>

          {/* Google social button below the form */}
          <div style={{ textAlign: "center", color: "#6b7280", margin: "15px 0" }}>or</div>
          <SocialButton bgColor="#ff2600ff" onClick={() => handleSocialRegister("Google")}>
            <img src={GoogleLogo} alt="Google" /> Sign up with Google
          </SocialButton>

          <LoginLink>
            Already have an account? <Link to="/login">Login</Link>
          </LoginLink>
        </RegisterForm>
      </RegisterPageWrapper>
    </PageContainer>
  );
};

export default RegisterPage;
