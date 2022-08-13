import { createContext, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();
const api = process.env.REACT_APP_API_URL;

function AuthProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [auth, setAuth] = useState(null);
  
  const authenticate = () => {
    const token = Cookies.get("token");
    if (token) {
      setAuth(parseJwt(token));
      setIsLoggedIn(true);
      return true;
    } else {
      setAuth(null);
      setIsLoggedIn(false);
      return false;
    }
  };

  const values = { auth, setAuth, login, logout, register, authenticate, isLoading, setIsLoading, isLoggedIn, setIsLoggedIn };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

function parseJwt (token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

const login = async (email, password) => {
  console.log("login starting", email, password);
  const request = await fetch(`${api}/login`, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const response = await request.json();

  const in30Minutes = new Date(new Date().getTime() + 30 * 60 * 1000);
  Cookies.set("token", response.token, { expires: in30Minutes });
  Cookies.set("uuid", response.uuid, { expires: in30Minutes });

  return response;
};

const logout = () => {
  Cookies.remove("token");
  Cookies.remove("uuid");
};

const register = async (username, email, password) => {
  const request = await fetch(`${api}/register`, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({username, email, password}),
  });
  const response = await request.json();
  return response;
};



export default AuthProvider;
