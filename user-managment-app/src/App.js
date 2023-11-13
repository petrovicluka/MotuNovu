import React, { useState, useEffect } from 'react';
import './App.css'; // You can create this CSS file to style your components
import axios from 'axios';
import Login from './Login';


const App = () => {
  // New states for products
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });
  const [deleteProductId, setDeleteProductId] = useState('');
  const [updateProduct, setUpdateProduct] = useState({ id: '', name: '', price: '' });
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [orders, setOrder] = useState([]);
  const [updateOrder, setUpdateOrder] = useState({ id: '', customer_id: '' });
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [updateCustomer, setUpdateCustomer] = useState({ id: '', name: '' });

  useEffect(() => {
    // Fetch products when the component mounts
    fetchCustomerDetails();
    fetchProducts();
  }, []);

  const handleLogin = (username) => {
    setUser(username);
    setAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setAuthenticated(false);
  };

  const fetchCustomerDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/customers`);
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customer details:', error);
    }
  };

  const updateCustomerHandler = async () => {
    try {
      console.log('Update Customer ID:', updateCustomer.id);
      console.log('Update Customer Name:', updateCustomer.name);

      const response = await axios.put(`http://localhost:3001/api/customers/${updateCustomer.id}`, {
        name: updateCustomer.name,
        // other fields you want to update
      });

      if (response.status === 200) {
        alert(response.data.message);
        fetchCustomerDetails(); // Update the customer list after updating a customer
      } else {
        alert('Failed to update customer');
      }
    } catch (error) {
      console.error('Error updating customer:', error);
      alert('Error updating customer');
    }
  };

    // Function to delete a customer
  const deleteCustomerHandler = async (customerId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/customers/${customerId}`);

      if (response.data && response.data.message) {
        alert(response.data.message);
        fetchCustomerDetails(); // Update the customer list after deleting a customer
      } else {
        alert('Failed to delete customer');
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
      alert('Error deleting customer. Check the console for details.');
    }
  };
  // Add a new order
  const addOrder = async () => {
    if (!selectedCustomerId || !selectedProductId) {
      alert('Please select a customer and a product.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/orders', {
        customerId: selectedCustomerId,
        productId: selectedProductId,
      });

      if (response.data && response.data.message) {
        alert(response.data.message);
        fetchOrderDetails();
      } else {
        alert('Failed to add order');
      }
    } catch (error) {
      console.error('Error adding order:', error);
      alert('Error adding order');
    }
  }

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/orders`);
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  const updateOrderHandler = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/orders/${updateOrder.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_id: updateOrder.customer_id,
        }),
      });

      if (response.ok) {
        fetchOrderDetails();
        setUpdateOrder({ id: '', customer_id: '' });
      } else {
        console.error('Error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/orders/${orderId}`);

      if (response.data && response.data.message) {
        alert(response.data.message);
        fetchOrderDetails();
      } else {
        alert('Failed to delete order');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Error deleting order');
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/products');
      console.log('Products:', response.data); // Add this line
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const deleteProduct = async () => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/products/${deleteProductId}`);

      if (response.data && response.data.message) {
        alert(response.data.message);
        fetchProducts();
      } else {
        alert('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product. Check the console for details.');
    }
  };

  const updateProductHandler = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/products/${updateProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: updateProduct.name,
          price: updateProduct.price,
        }),
      });

      if (response.ok) {
        fetchProducts();
        setUpdateProduct({ id: '', name: '', price: '' });
        alert('Updated product successfully');
      } else {
        console.error('Error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="app">
      {!authenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div>
          {user === 'admin' ? (
            <>
              <h1>Admin Management Page</h1>
              <div className="order-list">
                <h2>Order List</h2>
                <button onClick={fetchOrderDetails}>List Orders</button>
                <ul>
                  {orders.map((order) => (
                    <li key={order.order_id}>
                      {`Order ID: ${order.order_id}, Customer Name: ${order.customer_name}`}
                      <div>
                        <button onClick={() => deleteOrder(order.order_id)}>Delete Order</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="update-order">
                <h2>Update Order</h2>
                <label htmlFor="updateOrderId">Order ID:</label>
                <input
                  type="text"
                  id="updateOrderId"
                  value={updateOrder.id}
                  onChange={(e) => setUpdateOrder({ ...updateOrder, id: e.target.value })}
                />
                <label htmlFor="updateCustomerId">New Customer:</label>
                <select
                  id="updateCustomerId"
                  value={updateOrder.customer_id}
                  onChange={(e) => setUpdateOrder({ ...updateOrder, customer_id: e.target.value })}
                >
                  <option value="">Select Customer</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
                <div>
                  <button onClick={updateOrderHandler}>Update Order</button>

                </div>
              </div>
              <div className="customer-list">
                <h2>Customer List</h2>
                <button onClick={fetchCustomerDetails}>List Customers</button>
                <ul>
                  {customers.map((customer) => (
                    <li key={customer.id}>
                      {`Name: ${customer.name}`}
                      <div>
                        <button onClick={() => deleteCustomerHandler(customer.id)}>Delete Customer</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="update-customer">
                <h2>Update Customer</h2>
                <label htmlFor="updateCustomerId">Select Customer ID:</label>
                <select
                  id="updateCustomerId"
                  value={updateCustomer.id}
                  onChange={(e) => setUpdateCustomer({ ...updateCustomer, id: e.target.value })}
                >
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.id}
                    </option>
                  ))}
                </select>

                <label htmlFor="updateCustomerName">New Customer Name:</label>
                <input
                  type="text"
                  id="updateCustomerName"
                  value={updateCustomer.name}
                  onChange={(e) => setUpdateCustomer({ ...updateCustomer, name: e.target.value })}
                />
                <div>
                  <button onClick={updateCustomerHandler}>Update Customer</button>
                </div>
              </div>

              <div className="delete-product">
                <h2>Delete Product</h2>
                <label htmlFor="deleteProductId">Select Product:</label>
                <select
                  id="deleteProductId"
                  value={deleteProductId}
                  onChange={(e) => setDeleteProductId(e.target.value)}
                >
                  <option value="">Select Product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
                <button onClick={deleteProduct}>Delete Product</button>
              </div>

              <div className="update-product">
                <h2>Update Product</h2>
                <label htmlFor="updateProductId">Product ID:</label>

                <select
                  id="updateProductId"
                  value={updateProduct.id}
                  onChange={(e) => setUpdateProduct({ ...updateProduct, id: e.target.value })}
                >
                  <option value="">Select Product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>

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
            </>
          ) : (

            <>
            <h1>User Management Page</h1>
              {/* New section for non-admin users */}
              <div className="order-list">
                <h2>Order List</h2>
                <button onClick={fetchOrderDetails}>List Orders</button>
                <ul>
                  {orders.map((order) => (
                    <li key={order.order_id}>
                      {`Order id: ${order.order_id}, Customer Name: ${order.customer_name}`}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="customer-list">
                <h2>Customer List</h2>
                <button onClick={fetchCustomerDetails}>List Customers</button>
                <ul>
                  {customers.map((customer) => (
                    <li key={customer.id}>
                      {`Name: ${customer.name}`}
                      <button onClick={() => deleteCustomerHandler(customer.id)}>Delete Customer</button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <label htmlFor="customerId">Customer:</label>
                <select id="customerId" value={selectedCustomerId} onChange={(e) => setSelectedCustomerId(e.target.value)}>
                  <option value="">Select Customer</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>

                <label htmlFor="productId">Product:</label>
                <select id="productId" value={selectedProductId} onChange={(e) => setSelectedProductId(e.target.value)}>
                  <option value="">Select Product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
                <div>
                  <button onClick={addOrder}>Add Order</button>
                </div>
              </div>
            </>
          )}
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      )
      }
    </div >
  );
};

export default App;
