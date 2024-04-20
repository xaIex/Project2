
const addToCart = (req,res) => {
    const { productId, productName, productPrice, productImage } = req.body; // details in the request body

    // Create a new item object with product details
    const newItem = {
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: 1 // Assuming the initial quantity is 1
    };

    // Initialize the cart in the session if it doesn't exist
    req.session.cart = req.session.cart || [];
    recentlyAddedItem = newItem;
    // Check if the item is already in the cart
    const existingItemIndex = req.session.cart.findIndex(item => item.id === productId);
    if (existingItemIndex !== -1) {
        // If the item is already in the cart, increment its quantity
        req.session.cart[existingItemIndex].quantity++;
    } else {
        // If the item is not in the cart, add it
        req.session.cart.push(newItem);
    }

    // Send a response (you may redirect the user to the cart page or send a JSON response)
  
    console.log(req.session.cart);
    
    res.redirect('/productCart');
   
};

module.exports = {
    addToCart
}