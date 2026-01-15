
// src/pages/RegisterHorizontal.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles.css";
import Header from "../Components/Header";

export default function RegisterHorizontal() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    dob: "",
    insurance: "",
    healthStatus: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Enter a valid email.";
    if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Enter a 10-digit phone number.";
    if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      alert(`Patient Registered: ${formData.name}`);
      // TODO: Replace alert with backend API call
      // const send = fetch("http://localhost:5000/api/patients/register", {
      //   method: "POST",
      //   headers: {)

      
    }
  };

  return (
    <>
      {/* ✅ Medi-Connect header */}
      <Header />

      <div className="container">
        <form className="form-horizontal" onSubmit={handleSubmit} noValidate>
          <h2>Patient Registration</h2>

          <div className="form-row">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-row">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-row">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="10-digit phone number"
              required
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>

          <div className="form-row">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
            />
          </div>

          <div className="form-row">
            <label>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-row">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              placeholder="Select your date of birth"
            />
          </div>

          <div className="form-row">
            <label>Insurance Policy</label>
            <input
              type="text"
              name="insurance"
              value={formData.insurance}
              onChange={handleChange}
              placeholder="Enter insurance policy number"
            />
          </div>

          <div className="form-row">
            <label>Health Status</label>
            <textarea
              name="healthStatus"
              value={formData.healthStatus}
              onChange={handleChange}
              rows={3}
              placeholder="Describe your current health status"
            />
          </div>

          <div className="form-row">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              required
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="form-row">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              required
            />
            {errors.confirmPassword && (
              <span className="error">{errors.confirmPassword}</span>
            )}
          </div>

          <button type="submit">Register</button>

          <p className="link">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </>
  );
}
