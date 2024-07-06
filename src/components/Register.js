import React, { useState } from "react";
// import '../styles'; // Import styles
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa"; // Import icons as needed
import { register } from "../helper/api";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Calculate password strength
    if (name === "password") {
      const strength = calculatePasswordStrength(value);
      setPasswordStrength(strength);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log("formData: ", formData);
    delete formData.confirmPassword;
    await register(formData);
    window.location.href = "/login";
    // console.log(formData);
  };

  const calculatePasswordStrength = (password) => {
    // Very basic strength calculation for demonstration
    const strength = password.length * 10;
    return Math.min(strength, 100); // Cap strength at 100
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.body.classList.toggle("dark-theme", !isDarkTheme);
  };

  return (
    <div className={`login-container ${isDarkTheme ? "dark-theme" : ""}`}>
      <div className="login-card">
        {/* <div className="logo">
                    <img src={logoPlaceholder} alt="Your logo" />
                </div> */}
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="username@email.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <span
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? "Hide" : "Show"}
            </span>
            <div className="password-strength-meter">
              <progress
                className={`strength-${passwordStrength}`}
                value={passwordStrength}
                max="100"
              />
              <span>Password strength: {passwordStrength}%</span>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="sign-in-button">
            Register
          </button>
        </form>
        <div className="social-login">
          <p>or continue with</p>
          <div className="social-icons">
            <button>
              <FaGoogle />
            </button>
            <button>
              <FaGithub />
            </button>
            <button>
              <FaFacebook />
            </button>
          </div>
        </div>
        <p className="register-prompt">
          Already have an account? <a href="/login">Sign In</a>
        </p>
        {/* <button onClick={toggleTheme}>
                    {isDarkTheme ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                </button> */}
      </div>
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>
    </div>
  );
};

export default Register;
