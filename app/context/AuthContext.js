"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const token = Cookies.get("authToken") || localStorage.getItem("authToken");
    if (token) {
      setAuthToken(token);
    }
  }, []);

  const login = (token) => {
    setAuthToken(token);
    Cookies.set("authToken", token);
    localStorage.setItem("authToken", token);
  };

  const logout = () => {
    setAuthToken(null);
    Cookies.remove("authToken");
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
