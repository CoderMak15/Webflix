import React, { createContext, useState } from 'react';
import useCookie from 'react-use-cookie';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [basketItems, setBasketItems] = useState([]);
  const [cartVisibility, setCartVisibility] = useState(false);
  const [userToken, setUserToken, removeUserToken] = useCookie('token', '0');

  return (
    <AppContext.Provider value={{ 
      loggedIn, setLoggedIn, 
      basketItems, setBasketItems, 
      cartVisibility, setCartVisibility,
      userToken, setUserToken, removeUserToken 
      }}>
      {children}
    </AppContext.Provider>
  );
};