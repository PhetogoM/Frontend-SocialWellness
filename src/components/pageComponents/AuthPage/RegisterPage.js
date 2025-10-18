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

      // ✅ Use modularized API method
      await authAPI.register({
        name: firstName,
        surname,
        email,
        password,
        confirm_password: confirmPassword,
      });

      // ✅ Log in immediately after successful registration
      const data = await authAPI.login(email, password);
      
      // 🔥 FIXED: Get the actual user data from backend instead of hardcoding
      let user;
      if (data.user) {
        // If backend returns user data in login response
        user = data.user;
      } else {
        // If not, fetch the complete user profile from /api/me/
        try {
          user = await authAPI.getUser(); // This should call your MeView
        } catch (fetchError) {
          console.error("Failed to fetch user profile:", fetchError);
          // Fallback - but don't hardcode role
          user = { 
            name: firstName,
            surname: surname,
            email: email,
            // Role will be undefined, which is better than wrong
          };
        }
      }

      console.log("🔍 USER DATA TO STORE:", user); // Debug log

      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      
      // ✅ CHANGED: Navigate to homepage instead of /myculture
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
    const dummyUser = {
      name: "Social",
      surname: "User",
      email: "socialuser@gmail.com",
      role: "user",
    };
    localStorage.setItem("user", JSON.stringify(dummyUser));
    localStorage.setItem("access_token", "dummy_token");
    setUser(dummyUser);
    
    // ✅ CHANGED: Navigate to homepage instead of /myculture
    navigate("/");
  };

  return (
    <PageContainer>
      <RegisterForm onSubmit={handleSubmit}>
        <Title>Register to Unipath</Title>

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