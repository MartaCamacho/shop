import { createContext, useContext, useState, useEffect } from 'react';

export const PageContext = createContext();

export const usePageInfo = () => useContext(PageContext);

export const PageProvider = ({ children }) => {
  const [productDetails, setProductDetails] = useState(null);
  const [shoppingCartItems, setShoppingCartItems] = useState(null);

  useEffect(() => {
    const cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
      const cartItemsParsed = JSON.parse(cartItems);
      const now = new Date();

      if (now.getTime() > cartItemsParsed.expiry) {
        localStorage.removeItem('cartItems');
      } else {
        return setShoppingCartItems(cartItemsParsed.value);
      }
    }
  }, []);

  const setItemWithExpiry = (value, name, extra) => {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + 3600000,
    };
    if (extra) {
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
