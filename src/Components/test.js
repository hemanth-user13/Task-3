import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Header/Navbar';
import axios from 'axios';

function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/product/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product data", error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return <p>Loading...</p>;
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
