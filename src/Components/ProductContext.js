
import React, { createContext, useState, useContext } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <ProductContext.Provider value={{ data, setData, searchTerm, setSearchTerm }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext = () => useContext(ProductContext);
