// customerRoutes.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
//const pool = require('./motunovu'); // Import the database connection module

const pool = mysql.createPool({
  host: 'localhost',
  user: 'luka',
  database: 'motunovu',
  password: 'paracin95',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 60000, // 60 seconds timeout
});

// Retrieve all customers
router.get('/customers', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM customers');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new customer
router.post('/customers', async (req, res) => {
    const { name } = req.body;
  
    try {
      const [result] = await pool.execute('INSERT INTO customers (name) VALUES (?)', [name]);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// Delete a customer by ID
router.delete('/customers/:id', async (req, res) => {
  const customerId = req.params.id;

  try {
    // Check if there are orders associated with the customer
    const [orders] = await pool.execute('SELECT id FROM orders WHERE customer_id = ?', [customerId]);

    if (orders.length > 0) {
      // Delete associated orders first
      await pool.execute('DELETE FROM orders WHERE customer_id = ?', [customerId]);
    }

    // Now, delete the customer
    const [result] = await pool.execute('DELETE FROM customers WHERE id = ?', [customerId]);

    if (result && result.affectedRows > 0) {
      res.json({ message: 'Customer deleted successfully' });
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// UPDATE a customer by ID
router.put('/customers/:id', async (req, res) => {
    const customerId = req.params.id;
    const { name } = req.body;
  
    try {
      const [result] = await pool.execute('UPDATE customers SET name = ? WHERE id = ?', [name, customerId]);
  
      if (result && result.affectedRows > 0) {
        res.json({ message: 'Customer updated successfully' });
      } else {
        res.status(404).json({ error: 'Customer not found' });
      }
    } catch (error) {
      console.error('Error updating customer:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports = router;
  
  
module.exports = router;
