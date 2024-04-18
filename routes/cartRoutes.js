const express = require('express');
const router = express.Router();

router.get('/cart', (req, res) => {
    // Retrieve cart data from session or database
    const cart = req.session.cart || cartData; // Assuming cartData is defined elsewhere
    // Render the cart.ejs template with cart data
    res.render('cart', { cart });
});

module.exports = router;
