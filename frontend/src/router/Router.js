import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRouter from "./PrivateRoute";

import Header from "../components/Header/Header";

import AppPage from "../pages/App/App";
import LoginPage from "../pages/Login/Login";
import LogoutPage from "../pages/Logout/Logout";
import RegisterPage from "../pages/Register/Register";

import { AuthContext } from "../context/AuthContext";
import { useEffect, useContext } from "react";

export default function AppRouter() {
  const { authenticate, isLoading, setIsLoading, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const checkLoggedIn = authenticate();
    if (checkLoggedIn) setIsLoggedIn(true);
    setIsLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  if(isLoading) return null;

  return (
    <>
      <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<PrivateRouter isLoggedIn={isLoggedIn}><AppPage /></PrivateRouter>}/>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
      </BrowserRouter>
    </>
  );
}
