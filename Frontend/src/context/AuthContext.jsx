import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};




/*main.jsx → calls AuthProvider
AuthProvider → provides auth state  (just makes useState/space)
useAuth() → auth states can be used anywhere in the app  (login page setUser then other components in frontend access it)

Think of AuthProvider as putting a shared auth box around your whole application.*/