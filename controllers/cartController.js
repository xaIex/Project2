
const addToCart = (req,res) => {
    const { productId, productName, productPrice, productImage, productSize } = req.body; // details in the request body

    // Create a new item object with product details
    console.log(productSize);
    const newItem = {
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
        size: productSize,
        quantity: 1 // Assuming the initial quantity is 1
    };

    // Initialize the cart in the session if it doesn't exist
    req.session.cart = req.session.cart || [];
    recentlyAddedItem = newItem; // a copy for the addProductCartPage, displays the product that was just added
    // Check if the item is already in the cart  check both the id AND the size, checking size is important because the user can order the same product but different sizing                
    const existingItemIndex = req.session.cart.findIndex(item => item.id === productId && item.size === productSize);
    if (existingItemIndex !== -1) {
        // If the item is already in the cart, increment its quantity
        req.session.cart[existingItemIndex].quantity++;
    } else {
        // If the item is not in the cart, add it
        req.session.cart.push(newItem);
    }

    // Send a response 
  
    console.log(req.session.cart);
    
    res.redirect('/cart/productAddedPage');
   
};

const removeFromCart = (req,res) => {
    const { productId } = req.body;

    // Retrieve cart from session
    const cart = req.session.cart || [];

    // Find index of item to remove
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex !== -1) {
        // Remove item from cart array
        cart.splice(itemIndex, 1);
        // Update session with modified cart
        req.session.cart = cart;
        res.json({ success: true, message: 'Item removed from cart' });
    } else {
        res.json({ success: false, message: 'Item not found in cart' });
    }
};


const updateCartQuantity = (req,res) => {
    const { productId, change } = req.body;

    // Retrieve cart from session
    const cart = req.session.cart || [];

    // Find index of item to update
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex !== -1) {
        // Update item quantity
        cart[itemIndex].quantity += change;
        // Ensure quantity is not negative
        if (cart[itemIndex].quantity < 0) {
            cart[itemIndex].quantity = 0;
        }
        if(cart[itemIndex].quantity === 0){
            cart.splice(itemIndex, 1);
   
        }
       
        
        // Update session with modified cart
        req.session.cart = cart;
        res.json({ success: true, message: 'Cart quantity updated' });
    } else {
        
        res.json({ success: false, message: 'Item not found in cart' });
    }
};

const renderCart = (req,res) => {
    // Retrieve cart data from session
    const cart = req.session.cart || [];

    // Render cart.ejs and pass cart data to it
    res.render('cart.ejs', { cart });
};
//removes all the products in the cart
const clearCart = (req,res) => {
    // Clear the cart data in the session
    req.session.cart = [];
    
    // Redirect the user back to the cart page 
    res.redirect('/cart/cartContents');
};

// redirects the user to the page where it displays the product they added
const productCartAdded = (req,res) => {
    const cart = req.session.cart || [];
    
    res.render('addProductCartPage.ejs', { cart, recentlyAddedItem });
};


module.exports = {
    addToCart,
    removeFromCart,
    updateCartQuantity,
    renderCart,
    clearCart,
    productCartAdded
}