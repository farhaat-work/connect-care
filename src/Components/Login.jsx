import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles.css";
import Header from "./Header";
import { useRole } from "../Context/RoleContext";

export default function LoginWithRoles() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { role, loginAs } = useRole();

  // Setup mock users in localStorage once
  useEffect(() => {
    const existing = localStorage.getItem("users");
    if (!existing) {
      const users = [
        { username: "patient1", password: "patient123", role: "patient" },
        { username: "doctor1", password: "doctor123", role: "doctor" },
        { username: "admin1", password: "admin123", role: "admin" },
      ];
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, []);

  // Redirect when role changes
  useEffect(() => {
    if (role === "admin") navigate("/admin", { replace: true });
    else if (role === "doctor") navigate("/doctor-dashboard", { replace: true });
    else if (role === "patient") navigate("/patient-dashboard", { replace: true });

  }, [role, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required.";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (!formData.role) newErrors.role = "Please select a role.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const data = JSON.parse(localStorage.getItem("users")) || [];
      const user = data.find(
        (u) =>
          u.username === formData.username &&
          u.password === formData.password &&
          u.role === formData.role
      );

      if (user) {
        const normalizedRole = user.role.trim().toLowerCase();
        loginAs(normalizedRole);
      } else {
        setErrors({ api: "Invalid credentials or role mismatch." });
      }
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <form className="form" onSubmit={handleSubmit} noValidate>
          <h2>Login Portal</h2>

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

          {/* Password */}
          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && <span className="error">{errors.password}</span>}

          {/* Forgot Password */}
          <p className="link">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>

          {/* Role */}
          <label>Role</label>
          <div className="role-options">
            <label>
              <input
                type="radio"
                name="role"
                value="patient"
                checked={formData.role === "patient"}
                onChange={handleChange}
              />{" "}
              Patient
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="admin"
                checked={formData.role === "admin"}
                onChange={handleChange}
              />{" "}
              Admin
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="doctor"
                checked={formData.role === "doctor"}
                onChange={handleChange}
              />{" "}
              Doctor
            </label>
          </div>
          {errors.role && <span className="error">{errors.role}</span>}

          {/* API error */}
          {errors.api && <span className="error">{errors.api}</span>}

          {/* Submit */}
          <button type="submit">Login</button>

          {/* Switch link */}
          <p className="link">
            New patient? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </>
  );
}
