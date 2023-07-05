// script.js
// Cart functionality

// Retrieve cart data from localStorage or create an empty cart array
var cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add event listeners to "Add to Cart" buttons
var addToCartButtons = document.getElementsByClassName('add-to-cart-btn');
for (var i = 0; i < addToCartButtons.length; i++) {
  addToCartButtons[i].addEventListener('click', addToCart);
}

// Function to handle "Add to Cart" button click
function addToCart(event) {
  var button = event.target;
  var productId = button.getAttribute('data-id');
  var productName = button.getAttribute('data-name');
  var productPrice = button.getAttribute('data-price');

  // Create cart item object
  var cartItem = {
    id: productId,
    name: productName,
    price: parseFloat(productPrice),
    quantity: 1
  };

  // Check if the item is already in the cart
  var existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push(cartItem);
  }

  // Update cart data in localStorage
  localStorage.setItem('cart',
