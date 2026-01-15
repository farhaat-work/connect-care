
// src/pages/ForgotPassword.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles.css";
import Header from "../Components/Header"; // ✅ import Header

export default function ForgotPassword() {
  const [formData, setFormData] = useState({
    username: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim())
      newErrors.username = "Username is required.";
    if (formData.newPassword.length < 6)
      newErrors.newPassword = "Password must be at least 6 characters.";
    if (formData.newPassword !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert("Password changed successfully!");
      navigate("/login"); // navigate back to login page
    }
  };

  return (
    <>
      {/* ✅ Medi-Connect header */}
      <Header />

      <div className="container">
        <form className="form" onSubmit={handleSubmit} noValidate>
          <h2>Forgot Password</h2>

          {/* Username */}
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && <span className="error">{errors.username}</span>}

          {/* New Password */}
          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
          {errors.newPassword && (
            <span className="error">{errors.newPassword}</span>
          )}

          {/* Confirm Password */}
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}

          {/* Submit */}
          <button type="submit">Change Password</button>

          {/* Back to login */}
          <p className="link">
            <Link to="/login">Back to Login</Link>
          </p>
        </form>
      </div>
    </>
  );
}
