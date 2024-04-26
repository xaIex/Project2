const express = require('express');
const router = express.Router();

const {
    addToCart, 
    removeFromCart, 
    updateCartQuantity, 
    renderCart,
    clearCart,
    productCartAdded
} = require('../controllers/cartController');

router.post('/addProduct', addToCart);
router.post('/removeProduct', removeFromCart);
router.post('/updateProduct', updateCartQuantity);
router.get('/cartContents', renderCart);
router.post('/clearCartContents', clearCart);
router.get('/productAddedPage', productCartAdded);


module.exports = router;