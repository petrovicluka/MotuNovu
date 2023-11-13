// Example for orderRoutes.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'luka',
    database: 'motunovu',
    password: 'paracin95',
    port: 3306, // MySQL port
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Retrieve all orders
router.get('/orders', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT o.id as order_id, o.customer_id, c.name as customer_name FROM orders o JOIN customers c ON o.customer_id = c.id');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add a new order
// Example route for creating a new order
router.post('/orders', async (req, res) => {
  const { customerId, productId } = req.body;

  try {
    // Insert a new order into the Orders table
    const [orderResult] = await pool.execute('INSERT INTO Orders (customer_id) VALUES (?)', [customerId]);
    const orderId = orderResult.insertId;

    // Insert order item into the Order_Products table
    await pool.execute('INSERT INTO order_products (order_id, product_id, quantity) VALUES (?, ?, ?)', [orderId, productId, 1]);

    res.json({ message: 'Order created successfully' });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


  
// Delete an order by ID
router.delete('/orders/:id', async (req, res) => {
    const orderId = req.params.id;

    try {
        const [result] = await pool.execute('DELETE FROM orders WHERE id = ?', [orderId]);

        if (result && result.affectedRows > 0) {
            res.json({ message: 'Order deleted successfully' });
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// UPDATE an order by ID
router.put('/orders/:id', async (req, res) => {
    const orderId = req.params.id;
    const { customer_id } = req.body;
  
    try {
      const [result] = await pool.execute('UPDATE orders SET customer_id = ? WHERE id = ?', [customer_id, orderId]);
  
      if (result && result.affectedRows > 0) {
        res.json({ message: 'Order updated successfully' });
      } else {
        res.status(404).json({ error: 'Order not found' });
      }
    } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  


module.exports = router;
