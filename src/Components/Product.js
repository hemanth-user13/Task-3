import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Header/Navbar';

function Product() {
    const location = useLocation();
    const { product } = location.state || {}; 

    if (product) {
        return <p>No product details available.</p>;
    }

    return (
        <div>
            <Navbar />
            <h1 className='text-4xl text-center my-9'>Product Details</h1>
        </div>
    );
}

export default Product;
