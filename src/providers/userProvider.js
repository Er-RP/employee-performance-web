import React, { useContext, useEffect, useState } from "react";
import { get } from "../network/api";
import { GIL } from "../utils/localStorage";

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
  const UID = GIL("UID");
  const [currentUser, setCurrentUser] = useState(initialState);
  const getUser = async () => {
    try {
      const res = await get("/users/me");
      console.log(res);
      if (res && res.success > 0) {
        setCurrentUser({
          loading: false,
          user: res.user,
          error: null,
        });
      }
    } catch (error) {
      console.log(error);
      setCurrentUser({
        loading: false,
        user: null,
        error: error?.respose?.data || "Error occurred",
      });
    }
  };
  useEffect(() => {
    if (!UID) {
      setCurrentUser({
        loading: false,
        user: null,
        error: "You must be logged in",
      });
    } else {
      getUser();
    }
  }, [UID]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}
