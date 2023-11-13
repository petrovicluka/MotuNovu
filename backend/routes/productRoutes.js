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

// Retrieve all products
router.get('/products', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new product
router.post('/products', async (req, res) => {
    const { name, price } = req.body;
  
    try {
      const [result] = await pool.execute('INSERT INTO products (name, price) VALUES (?, ?)', [name, price]);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Delete a product by ID
  router.delete('/products/:id', async (req, res) => {
    const productId = req.params.id;
  
    try {
      // Your logic to delete the product from the database
      const [result] = await pool.execute('DELETE FROM products WHERE id = ?', [productId]);
      
      // Check if the product was deleted successfully
      if (result && result.affectedRows > 0) {
        res.json({ message: 'Product deleted successfully' });
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  // UPDATE a product by ID
router.put('/products/:id', async (req, res) => {
    const productId = req.params.id;
    const { name, price } = req.body;
  
    try {
      const [result] = await pool.execute('UPDATE products SET name = ?, price = ? WHERE id = ?', [name, price, productId]);
  
      if (result && result.affectedRows > 0) {
        res.json({ message: 'Product updated successfully' });
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;
