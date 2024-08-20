import React, { useEffect, useState } from 'react';
import Navbar from './Header/Navbar';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

function SearchBar({ searchTerm, setSearchTerm }) {
    return (
        <div className="max-w-md mx-auto my-4">
            <input
                type="search"
                className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
}

function Home() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchData = async () => {
        try {
            const response1 = await axios.get('http://localhost:8000/amazon');
            const response2 = await axios.get('http://localhost:8000/flipkart');
            const response3 = await axios.get('http://localhost:8000/cellbay');
            const response4 = await axios.get('http://localhost:8000/snapStore');

            const combinedResponse = [
                ...response1.data.products,
                ...response2.data.products,
                ...response3.data.products,
                ...response4.data.products,
            ];

            setData(combinedResponse);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    const deleteProduct = (id) => {
        setData(data.filter(item => item.id !== id));
        Swal.fire('Deleted!', 'Product has been deleted.', 'success');
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredData = data.filter(item => 
        item.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Navbar />
            <h1 className='text-4xl text-center my-9 ml-48'>Product Management</h1>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className='flex justify-end gap-10 mb-4 pr-20'>
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">Filter</button>
                <EditData setData={setData} />
            </div>
            <div className='w-auto ml-80'>
                {filteredData.length > 0 ? (
                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Id</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Brand</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item, index) => (
                                <tr key={index} className="bg-white border-b">
                                    <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Link to={`/product/${item.id}`}>
                                            {item.product_name}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.brand}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
                                    <td className="">
                                        <button
                                            className="text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap flex gap-4">
                                        <button
                                            onClick={() => deleteProduct(item.id)}
                                            className="text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center">Loading...</p>
                )}
            </div>
        </div>
    );
}

function EditData({ setData }) {
    const handleEditClick = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Add Product Details',
            html: `
                <input id="product-name" class="swal2-input" placeholder="Product Name">
                <input id="product-brand" class="swal2-input" placeholder="Product Brand">
                <input id="product-price" class="swal2-input" placeholder="Product Price">
                <select id="category" class="swal2-select">
                    <option value="amazon">Amazon</option>
                    <option value="flipkart">Flipkart</option>
                    <option value="cellbay">Cellbay</option>
                    <option value="snapStore">Snap Store</option>
                </select>
            `,
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => {
                return {
                    productName: document.getElementById('product-name').value,
                    productBrand: document.getElementById('product-brand').value,
                    productPrice: document.getElementById('product-price').value,
                    category: document.getElementById('category').value
                };
            }
        });

        if (formValues) {
            const { productName, productBrand, productPrice, category } = formValues;
            const newProduct = {
                id: Date.now(),  
                product_name: productName,
                brand: productBrand,
                price: productPrice,
                category: category
            };
            setData(prevData => [...prevData, newProduct]);
            Swal.fire('Success', 'Product details have been added.', 'success');
        }
    };

    return (
        <button
            type="button"
            className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
            onClick={handleEditClick}
        >
            Add Items
        </button>
    );
}

export default Home;
