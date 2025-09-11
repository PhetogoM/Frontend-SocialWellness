import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../apiComponents/api.js";
import {
  PageContainer,
  RegisterForm,
  Input,
  Button,
  Title,
  SocialButton,
  LoginLink,
} from "./RegisterPage.styled.js";

const GoogleLogo = "/image/google-logo.png";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !surname || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await api.post("api/register/", {
        name: firstName,
        surname: surname,
        email: email,
        password: password,
        confirm_password: confirmPassword,
      });

      // Auto-login after registration
      const tokenRes = await api.post("api/token/", { email: email, password });

      const user = tokenRes.data.user || { name: firstName, surname: surname, email: email  };
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
      <RegisterForm onSubmit={handleSubmit}>
        <Title>Register to Unipath</Title>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <Input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
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
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>

        <div style={{ textAlign: "center", color: "#6b7280", margin: "15px 0" }}>or</div>
        <SocialButton bgColor="#ff2600ff" onClick={() => handleSocialRegister("Google")}>
          <img src={GoogleLogo} alt="Google" /> Sign up with Google
        </SocialButton>

        <LoginLink>
          Already have an account? <Link to="/login">Login</Link>
        </LoginLink>
      </RegisterForm>
    </PageContainer>
  );
};

export default RegisterPage;
