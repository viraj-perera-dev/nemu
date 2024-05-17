import React, { createContext, useState, useContext } from 'react';

// Create the context
const MenuContext = createContext();

// Create the provider component
export const MenuProvider = ({ children }) => {
  const [removeFilters, setRemoveFilters] = useState(false);
  const [originalMenu, setOriginalMenu] = useState([]);
  const [menuCategories, setMenuCategories] = useState([]);
  const [allerginesMenu, setAllerginesMenu] = useState([]);
  const [escludiMenu, setEscludiMenu] = useState([]);
  const [includiMenu, setIncludiMenu] = useState([]);



  return (
    <MenuContext.Provider value={{ originalMenu, setOriginalMenu, menuCategories, setMenuCategories, allerginesMenu, setAllerginesMenu, removeFilters, setRemoveFilters, escludiMenu, setEscludiMenu, includiMenu, setIncludiMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

// Custom hook to use the Menu context
export const useMenuContext = () => {
  return useContext(MenuContext);
};
