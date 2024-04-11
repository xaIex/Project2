function addToCart() {
    // Send AJAX request to server to add product to cart
    fetch('/addToCart', {
        method: 'POST',
        body: JSON.stringify({ 
            productId: 'product1', // Replace with the actual product ID
            productName: 'Vintage Wash Denim', // Replace with the actual product name
            productPrice: 50.00, // Replace with the actual product price
            productImage: 'products/product1.jpg' // Replace with the actual product image URL
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Handle response (optional)
        console.log(data);
    })
    .catch(error => console.error('Error:', error));
}

function removeItem(productId) {
    // Send AJAX request to server to remove the item from the cart
    fetch('/remove-from-cart', {
        method: 'POST',
        body: JSON.stringify({ productId }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Handle response (optional)
        console.log(data);
        // Reload the page or update the cart display as needed
        location.reload(); // Reload the page to reflect the updated cart
    })
    .catch(error => console.error('Error:', error));
}
