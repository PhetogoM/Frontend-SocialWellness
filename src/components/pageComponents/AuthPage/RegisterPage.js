import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet"; // ✅ Import Helmet
import { authAPI } from "../../apiComponents/authApi.js";
import {
  PageContainer,
  AuthForm as RegisterForm,
  Input,
  Button,
  Title,
  SocialButton,
  RegisterLink,
} from "./AuthForm.styled.js";

const GoogleLogo = "/image/google-logo.png";

const RegisterPage = ({ setUser }) => {
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

      await authAPI.register({
        name: firstName,
        surname,
        email,
        password,
        confirm_password: confirmPassword,
      });

      const data = await authAPI.login(email, password);
      const user = data.user || { name: firstName, surname, email, role: "user" };

      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      navigate("/myculture");
    } catch (err) {
      console.error(err);
      let message = "";
      if (err.response && err.response.data) {
        for (const key in err.response.data) {
          if (Array.isArray(err.response.data[key])) {
            message += `${key}: ${err.response.data[key].join(", ")}\n`;
          } else {
            message += `${key}: ${err.response.data[key]}\n`;
          }
        }
      } else {
        message = "An unexpected error occurred.";
      }
      setError("Registration failed.\n" + message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialRegister = () => {
    const dummyUser = {
      name: "Social",
      surname: "User",
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
      {/* ✅ SEO Optimization using Helmet */}
      <Helmet>
        <title>Register | UniPath</title>
        <meta
          name="description"
          content="Create your UniPath account to access personalized learning resources and track your academic progress. Sign up easily using your email or Google account."
        />
        <meta
          name="keywords"
          content="UniPath register, student registration, university login, education signup, learning platform"
        />
        <meta name="author" content="UniPath Team" />
        <meta property="og:title" content="Register on UniPath" />
        <meta
          property="og:description"
          content="Sign up for UniPath to start your academic journey today."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/register" />
        <meta property="og:image" content="/image/unipath-preview.png" />
      </Helmet>

      <RegisterForm onSubmit={handleSubmit}>
        <Title>Register to UniPath</Title>

        {error && (
          <div style={{ color: "red", marginBottom: "10px" }}>
            {error.split("\n").map(
              (line, idx) => line.trim() && <div key={idx}>{line}</div>
            )}
          </div>
        )}

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

        <div
          style={{ textAlign: "center", color: "#6b7280", margin: "15px 0" }}
        >
          or
        </div>

        <SocialButton
          bgColor="#ff2600ff"
          onClick={() => handleSocialRegister("Google")}
        >
          <img src={GoogleLogo} alt="Google" /> Sign up with Google
        </SocialButton>

        <RegisterLink>
          Already have an account? <Link to="/login">Login</Link>
        </RegisterLink>
      </RegisterForm>
    </PageContainer>
  );
};

export default RegisterPage;
