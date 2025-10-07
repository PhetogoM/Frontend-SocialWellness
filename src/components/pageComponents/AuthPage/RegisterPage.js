// src/components/pageComponents/RegisterPage/RegisterPage.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
      await authAPI.post("auth/register/", { name: firstName, surname: surname, email, password, confirm_password: confirmPassword });

      const tokenRes = await authAPI.post("auth/login/", { email, password });
      const user = tokenRes.data.user || { name: firstName, surname: surname, email, role: "user" };
      localStorage.setItem("access_token", tokenRes.data.access);
      localStorage.setItem("refresh_token", tokenRes.data.refresh);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      navigate("/myculture");
    } catch (err) {
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
    }
    finally {
      setLoading(false);
    }
  };

  const handleSocialRegister = (provider) => {
    const dummyUser = { name: "Social", surname: "User", email: "socialuser@gmail.com", role: "user", confirmPassword: "sociallogin" };
    localStorage.setItem("user", JSON.stringify(dummyUser));
    localStorage.setItem("access_token", "dummy_token");
    setUser(dummyUser);
    navigate("/myculture");
  };

  return (
    <PageContainer>
      <RegisterForm onSubmit={handleSubmit}>
        <Title>Register to Unipath</Title>
        {/* Display each error in a separate div */}
        {error && (
  <div style={{ color: "red", marginBottom: "10px" }}>
    {error.split('\n').map((line, idx) =>
      line.trim() ? <div key={idx}>{line}</div> : null
    )}
  </div>
)}

        <Input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <Input type="text" placeholder="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

        <Button type="submit" disabled={loading}>{loading ? "Registering..." : "Register"}</Button>

        <div style={{ textAlign: "center", color: "#6b7280", margin: "15px 0" }}>or</div>
        <SocialButton bgColor="#ff2600ff" onClick={() => handleSocialRegister("Google")}>
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
