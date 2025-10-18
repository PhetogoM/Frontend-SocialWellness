import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
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

      await authAPI.register({ name: firstName, surname, email, password, confirm_password: confirmPassword });

      const data = await authAPI.login(email, password);

      let user;
      if (data.user) {
        user = data.user;
      } else {
        try {
          user = await authAPI.getUser();
        } catch (fetchError) {
          console.error("Failed to fetch user profile:", fetchError);
          user = { name: firstName, surname, email };
        }
      }

      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      navigate("/");
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
    const dummyUser = { name: "Social", surname: "User", email: "socialuser@gmail.com", role: "user" };
    localStorage.setItem("user", JSON.stringify(dummyUser));
    localStorage.setItem("access_token", "dummy_token");
    setUser(dummyUser);
    navigate("/");
  };

  return (
    <PageContainer>
      {/* 🌐 SEO Metadata */}
      <Helmet>
        <title>Register | UniPath</title>
        <meta name="description" content="Create a new account on UniPath to join the student community, share cultural posts, and explore traditions." />
        <meta name="keywords" content="UniPath register, create account, student portal, cultural posts, signup" />
        <meta property="og:title" content="Register | UniPath" />
        <meta property="og:description" content="Create a new account on UniPath to join the student community, share cultural posts, and explore traditions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/register" />
      </Helmet>

      <RegisterForm onSubmit={handleSubmit}>
        <Title>Register to UniPath</Title>

        {error && (
          <div style={{ color: "red", marginBottom: "10px" }}>
            {error.split("\n").map((line, idx) => line.trim() && <div key={idx}>{line}</div>)}
          </div>
        )}

        <Input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <Input type="text" placeholder="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

        <Button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>

        <div style={{ textAlign: "center", color: "#6b7280", margin: "15px 0" }}>or</div>

        <SocialButton bgColor="#ff2600ff" onClick={handleSocialRegister}>
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
