import { createContext, useContext, useState } from "react";

export const PageContext = createContext();

export const usePageInfo = () => useContext(PageContext);

export const PageProvider = ({ children }) => {
    const [productDetails, setProductDetails] = useState(null);
    const [shoppingCartItems, setShoppingCartItems] = useState(null);


    return (
        <PageContext.Provider value={{productDetails, setProductDetails, shoppingCartItems, setShoppingCartItems}}>
            {children}
        </PageContext.Provider>
    )
}