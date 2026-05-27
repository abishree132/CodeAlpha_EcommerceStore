const API = 'http://localhost:5000';

// Load products
async function loadProducts() {
  const response = await fetch(`${API}/products`);
  const products = await response.json();

  const productContainer = document.getElementById('products');

  products.forEach(product => {
    productContainer.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
      </div>
      `;
  });
}

// Add product to cart
async function addToCart(product) {
  await fetch(`${API}/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  });

  alert('Added to cart');
}
// View cart
async function viewCart() {
  const response = await fetch(`${API}/cart`);
  const cartItems = await response.json();

  const cartSection = document.getElementById('cartSection');

  cartSection.innerHTML = '<h2>Cart Items</h2>';

  cartItems.forEach(item => {
    cartSection.innerHTML += `
      <p>${item.name} - ₹${item.price}</p>
    `;
  });
 cartSection.innerHTML += `
    <button onclick="placeOrder()">Place Order</button>
  `;
}

// Place order
async function placeOrder() {
  const response = await fetch(`${API}/order`, {
    method: 'POST'
  });

  const data = await response.json();

  alert(data.message);
  document.getElementById('cartSection').innerHTML = '';
}
loadProducts();