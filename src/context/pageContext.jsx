import { createContext, useContext, useState } from 'react';

export const PageContext = createContext();

export const usePageInfo = () => useContext(PageContext);

export const PageProvider = ({ children }) => {
  const [productDetails, setProductDetails] = useState(null);
  const [shoppingCartItems, setShoppingCartItems] = useState(null);

  const setItemWithExpiry = (value, name, extra) => {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + 3600000,
    };
    if(extra) {
      item.extra = extra;
    }
    localStorage.setItem(name, JSON.stringify(item));
  };

  return (
    <PageContext.Provider
      value={{
        productDetails,
        setProductDetails,
        shoppingCartItems,
        setShoppingCartItems,
        setItemWithExpiry,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
