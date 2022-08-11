import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../pages/App/App";

import Header from "../components/Header/Header";

import LoginPage from "../pages/Login/Login"
import RegisterPage from "../pages/Register/Register"


export default function AppRouter() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}
