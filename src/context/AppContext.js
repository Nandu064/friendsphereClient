import React, { useEffect, useState } from "react";
import { createContext } from "react";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  console.log("children: ", children);
  const [user, setUser] = React.useState({});
  const [platform, setPlatform] = useState("desktop");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPostDeleted, setIsPostDeleted] = useState("");

  useEffect(() => {
    window.addEventListener("resize", () => {
      console.log("window.innerWidth: ", window.innerWidth);
      if (window.innerWidth < 425) {
        setPlatform("mobile");
      } else {
        setPlatform("desktop");
      }
    });
  }, []);

  const value = {
    user,
    platform,
    setUser,
    isLoggedIn,
    isPostDeleted,
    setIsPostDeleted,
    setIsLoggedIn,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// export default AppContextProvider;
