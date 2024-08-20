import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Header/Navbar';

function Product() {
    const location = useLocation();
    const { product } = location.state || {}; 

    if (!product) {
        return <p>No product details available.</p>;
    }

    return (
        <div>
            <Navbar />
            <h1 className='text-4xl text-center my-9'>Product Details</h1>
            <div className='max-w-md mx-auto'>
                <h2 className='text-2xl font-bold'>Product Name: {product.product_name}</h2>
                <p className='text-lg'>Brand: {product.brand}</p>
                <p className='text-lg'>Price: {product.price}</p>
                <p className='text-lg'>Category: {product.category}</p>
            </div>
        </div>
    );
}

export default Product;
