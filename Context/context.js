import { createContext } from "react";

const authContext = createContext({
    userData: {},
    setUserData: (user) => {}
  });

export default authContext;