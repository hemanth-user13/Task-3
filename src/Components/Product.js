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
            <div className='ml-72'>
                <div className='max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-md p-6'>
                    <h2 className='text-2xl font-semibold mb-4'>Product Information</h2>
                    <p className='mb-2'><strong className='font-medium'>Product Name:</strong> {product.product_name}</p>
                    <p className='mb-2'><strong className='font-medium'>Brand:</strong> {product.brand}</p>
                    <p className='mb-2'><strong className='font-medium'>Price:</strong> ₹ {product.price}</p>
                </div>
            </div>
        </div>
    );
}

export default Product;
