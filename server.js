const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let products = [
  {
    id: 1,
    name: "Laptop",
    price: 50000,
    image: "https://via.placeholder.com/200"
  },
  {
    id: 2,
    name: "Mobile",
    price: 20000,
    image: "https://via.placeholder.com/200"
  },
  {
    id: 3,
    name: "Headphones",
    price: 3000,
    image: "https://via.placeholder.com/200"
  }
];

let cart = [];

// Get products
app.get('/products', (req, res) => {
  res.json(products);
});

// Add to cart
app.post('/cart', (req, res) => {
  const product = req.body;
  cart.push(product);
  res.json({ message: 'Product added to cart' });
});

// Get cart items
app.get('/cart', (req, res) => {
  res.json(cart);
});

// Order processing
app.post('/order', (req, res) => {
  cart = [];
  res.json({ message: 'Order placed successfully!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});