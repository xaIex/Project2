const express = require('express');
const router = express.Router();

const {
    renderStoreOrder,
    submitOrderPage,
    renderOrderPage
} = require('../controllers/orderController');

router.get('/storeOrder', renderStoreOrder);
router.post('/submitOrder', submitOrderPage);
router.get('/orderPage', renderOrderPage);

module.exports = router;