import React from "react";

const initialState = {
  name: 'Pawan Balla',
  age: 30,
  email: 'pawan@example.com',
};

export const UserContext = React.createContext();

export const UserContextProvider = ({ children }) => {
  return (
    <UserContext.Provider value={initialState}>
      {children} {/* This is the correct way to render children */}
    </UserContext.Provider>
  );
};
