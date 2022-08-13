import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Logout() {
  const { logout, authenticate } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    authenticate();
    navigate("/");
  }, [logout, navigate, authenticate]);

  return null;
}

export default Logout;
