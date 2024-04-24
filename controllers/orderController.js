const Order = require('../models/orderModel')

const renderStoreOrder = (req,res) => {
    const cart = req.session.cart || [];
    const userOrder = req.session.user;
    res.render('storeOrder.ejs', {cart, userOrder});
};
const submitOrderPage = async (req,res) => {
    const { firstname, lastname, phone, street, zip, city, state, cardnumber, expiry, cvv, ordertotal} = req.body;
    
    const userId = req.session.user.id; // get the user id, the user that is logged in, this will create a link between the order and the user
    req.session.user.firstname1 = firstname;  // set the name the user entered in the user session to display their name 
    const cart = req.session.cart || [];
    console.log(userId); // check if its correct userId
    
    const order = new Order({
        user: userId, // referencing the user id, the infomation will be with this user 
        name: {
            firstName: firstname,
            lastName: lastname
        },
        items: cart.map(item => ({ //stores the products the user ordered in the database
            productName: item.name,
            productPrice: item.price,
            productQuantity: item.quantity,
            productSize: item.size
        })),
        
        billingInfo: {
            billAddress: street,
            billPhone: phone,
            billZip: zip,
            billCity: city,
            billState: state
        },

        paymentInfo: {
            cardNumber: cardnumber,
            cardExpiry: expiry,
            cardCVV: cvv
        },

        orderTotal: ordertotal,


    });

    await order.save();
    res.redirect('/order/storeOrder');
};

const renderOrderPage = (req,res) => {
    const user = req.session.user; // loginAccount in userController.js
    const cart = req.session.cart || [];
 
    console.log(user);
    res.render('orders.ejs', {user, cart});
};

module.exports = { 
    renderStoreOrder,
    submitOrderPage,
    renderOrderPage
}