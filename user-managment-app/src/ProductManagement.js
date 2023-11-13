// ProductManagement.js
import React, { useState } from 'react';

const ProductManagement = ({ fetchProducts, addProduct, deleteProduct, updateProductHandler }) => {
    const [newProduct, setNewProduct] = useState({ name: '', price: '' });
    const [deleteProductId, setDeleteProductId] = useState('');
    const [updateProduct, setUpdateProduct] = useState({ id: '', name: '', price: '' });
    const [products] = useState([]);

    return (
        <div className="product-management">
            <div className="add-product">
                <h2>Add Product</h2>
                <label htmlFor="productName">Product Name:</label>
                <input
                    type="text"
                    id="productName"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
                <label htmlFor="productPrice">Product Price:</label>
                <input
                    type="text"
                    id="productPrice"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
                <button onClick={addProduct}>Add Product</button>
            </div>

            <div className="delete-product">
                <h2>Delete Product</h2>
                <label htmlFor="deleteProductId">Product ID:</label>
                <input
                    type="text"
                    id="deleteProductId"
                    value={deleteProductId}
                    onChange={(e) => setDeleteProductId(e.target.value)}
                />
                <button onClick={deleteProduct}>Delete Product</button>
            </div>

            <div className="update-product">
                <h2>Update Product</h2>
                <label htmlFor="updateProductId">Product ID:</label>
                <input
                    type="text"
                    id="updateProductId"
                    value={updateProduct.id}
                    onChange={(e) => setUpdateProduct({ ...updateProduct, id: e.target.value })}
                />
                <label htmlFor="updateProductName">New Product Name:</label>
                <input
                    type="text"
                    id="updateProductName"
                    value={updateProduct.name}
                    onChange={(e) => setUpdateProduct({ ...updateProduct, name: e.target.value })}
                />
                <label htmlFor="updateProductPrice">New Product Price:</label>
                <input
                    type="text"
                    id="updateProductPrice"
                    value={updateProduct.price}
                    onChange={(e) => setUpdateProduct({ ...updateProduct, price: e.target.value })}
                />
                <button onClick={updateProductHandler}>Update Product</button>
            </div>

            <div className="product-list">
                <h2>Product List</h2>

                {/* Button to fetch and display products */}
                <button onClick={fetchProducts}>List Products</button>

                {/* Display the list of products */}
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>
                            {`Name: ${product.name}, Price: ${product.price}`}
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
};

export default ProductManagement;
