// src/context/UserRoleContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';

const UserRoleContext = createContext();

export const UserRoleProvider = ({ children }) => {
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchRole = () => {
      const userRole = localStorage.getItem('role');  // Fetch the role from localStorage or an API
      setRole(userRole || '');  // Set the role or default to empty
    };

    fetchRole();
  }, []);

  return (
    <UserRoleContext.Provider value={{ role }}>
      {children}
    </UserRoleContext.Provider>
  );
};

export const useUserRole = () => useContext(UserRoleContext);
