import React, { useContext, useEffect, useState } from "react";

const initialState = {
  loading: true,
  user: null,
  error: null,
};

const UserContext = React.createContext(initialState);

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(initialState);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setCurrentUser({
        loading: false,
        user: "RP",
        error: null,
      });
    }, 2000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [currentUser]);

  return (
    <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
  );
}
