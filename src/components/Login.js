import React, { useContext, useEffect, useState } from "react";
// import './Login.scss';
// import logoPlaceholder from "./logo-placeholder.png"; // Replace with your actual logo
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa"; // You'll need to install react-icons
import { login } from "../helper/api";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const { setUser, setIsLoggedIn } = useContext(AppContext);
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    setUser({});
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    return () => {};
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle registration logic here
    const formData = {
      username,
      password,
    };
    console.log("formData: ", formData);
    login(formData).then((res) => {
      console.log("res.data", res.data);
      setUser(res.data);
      setIsLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(res.data));
      window.location.href = "/";
    });
    // console.log(formData);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.body.classList.toggle("dark-theme", !isDarkTheme);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo">
          {/* <img src={logoPlaceholder} alt="Your logo" /> */}
        </div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Your username..."
              value={username}
              onChange={(e) => setusername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <a href="#forgot-password" className="forgot-password">
            Forgot Password?
          </a>
          <button type="submit" className="sign-in-button">
            Sign In
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
          Don't have an account yet? <a href="/register">Register for free</a>
        </p>
        {/* <button onClick={toggleTheme}>
          {isDarkTheme ? "Switch to Light Theme" : "Switch to Dark Theme"}
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

export default Login;
