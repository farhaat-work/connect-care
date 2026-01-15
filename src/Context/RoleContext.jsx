import { createContext, useContext, useEffect, useMemo, useState } from "react";

const RoleContext = createContext(null);

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(null);

  // Restore role on app load
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const loginAs = (newRole) => {
    localStorage.setItem("role", newRole);
    setRole(newRole);
  };

  const clearRole = () => {
    localStorage.removeItem("role");
    setRole(null);
  };

  const value = useMemo(
    () => ({ role, loginAs, clearRole }),
    [role]
  );

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
