// Create a context
import React, { createContext, useState } from 'react';


export const GlobalContext = React.createContext();

// Create a provider to wrap the entire app and provide the global state
export const GlobalProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    return (
        <GlobalContext.Provider value={{ cart, setCart }}>
            {children}
        </GlobalContext.Provider>
    );
};
