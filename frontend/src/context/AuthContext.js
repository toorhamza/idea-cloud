import  { useState, createContext } from "react";

export const AuthContext = createContext();

export default function AuthProvider ({ children }) {
    const [name, setName] = useState("John Doe");
    const [age, setAge] = useState(1);

    const values = { message, setMessage, severity, setSeverity };


    return (
      <AuthProvider.Provider value={values}>
        {children}
      </AuthProvider.Provider>
    );
  };