import React, { createContext, useState, useEffect } from "react";
import { loginUser, signupUser } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (credentials) => {
    const data = await loginUser(credentials);
    setUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
  };

  const signup = async (info) => {
    const data = await signupUser(info);
    setUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!user && token) {
      // Optional: validate token or fetch user profile here
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
