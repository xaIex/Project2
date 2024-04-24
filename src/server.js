const express = require('express');
const mongoose = require('mongoose');
const bycrpt = require('bcrypt');
const session = require('express-session');
const MongoDBStore = require("connect-mongodb-session")(session);
const User = require('../models/config');
const Order = require('../models/orderModel')
const userRoute = require('../routes/userRoutes');
const cartRoute = require('../routes/cartRoutes')
const orderRoute = require('../routes/orderRoutes')

const app = express();
// Set up MongoDB session store
const store = new MongoDBStore({
    uri: 'mongodb+srv://xcastillo2001:Sq5lBuispIryiMpf@project2.qadwpbn.mongodb.net/usersandorders',
    collection: 'sessions'
});
app.use(session({
    secret:'SECRET',
    saveUninitialized: false, // reducing memory set to false
    resave: false,
    store: store,
    cookie: {// determines how long a cookie lives, a user is logged in max 24 hrs
        maxAge: 60000 * 60 * 60 * 24
    }
}));

app.set('view engine','ejs'); // ejs as view engine for dynamic content
app.use(express.static("public")); // use public files

app.use(express.urlencoded({extended: false})); // parse body give access for req.body
app.use(express.json()); // Parse JSON bodies


mongoose.connect('mongodb+srv://xcastillo2001:Sq5lBuispIryiMpf@project2.qadwpbn.mongodb.net/usersandorders?retryWrites=true&w=majority&appName=project2')
.then(() => {
    console.log('connected to database!');
})
.catch(() => {
    console.log('error cannot connect to database');
})

app.use('/users', userRoute);
app.use('/cart', cartRoute);
app.use('/order', orderRoute);

app.get('/myOrders', async (req, res) => {
    try {
        // Get the user ID from the session
        const userId = req.session.user._id;

        // Query the database for orders associated with the user
        const orders = await Order.find({ user: userId });

        // Log the user details and orders
        console.log('User ID:', userId);
        console.log('Orders:', orders);

        // Send the orders back to the client
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).send('Error fetching orders');
    }
});


app.listen(3000, () => {
    console.log("running on port 3000");
});

