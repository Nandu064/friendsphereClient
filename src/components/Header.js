import React, { useContext, useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // You'll need to install react-icons
// import './_header.scss';
import logo from "../assets/images/fsLogo.svg";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);
  const [isMobile, setIsMobile] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  useEffect(() => {
    console.log("window.location.pathname", window.location.pathname);
    if (window.localStorage.pathname === "/login") {
      setIsRegister(false);
    } else {
      setIsRegister(true);
    }
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleMobileMenuToggle = () => {
    setIsMobile(!isMobile);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.body.classList.toggle("dark-theme", !isDarkTheme);
  };

  return (
    <header className="header">
      <div className="logo">
        <a href="#">
          {/* <img src={logo}></img> */}
          FriendSphere
        </a>
      </div>
      <nav className={isMobile ? "nav-links-mobile" : "nav-links"}>
        {!isLoggedIn && (
          <>
            {isRegister ? (
              <>
                <a href="/login" className="nav-link">
                  Login
                </a>
              </>
            ) : (
              <>
                <a href="/register" className="nav-link">
                  Register
                </a>
              </>
            )}
          </>
        )}
        {/* <a href="#services" className="nav-link">
          Services
        </a> */}
        {!isRegister && isLoggedIn && (
          <a href="/profile" className="nav-link profile">
            <div className="profile_icon">
              <span>HY</span>
            </div>
          </a>
        )}
        {/* <button onClick={toggleTheme} className="theme-toggle">
          {isDarkTheme ? "Light Mode" : "Dark Mode"}
        </button> */}
      </nav>
      <button className="mobile-menu-icon" onClick={handleMobileMenuToggle}>
        {isMobile ? <FaTimes /> : <FaBars />}
      </button>
    </header>
  );
};

export default Header;
