require('dotenv').config();
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
var path = require('path');
const app = express();


// Set up MongoDB session store
const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'sessions'
});

app.use(session({
    secret:process.env.SESSION_SECRET,
    saveUninitialized: false, // reducing memory set to false
    resave: false,
    store: store,
    cookie: {// determines how long a cookie lives, a user is logged in max 24 hrs
        maxAge: 60000 * 60 * 60 * 24
    }
}));

app.set('view engine','ejs'); // ejs as view engine for dynamic content
app.use(express.static("public")); // use public files
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '..', 'views'));


app.use(express.urlencoded({extended: false})); // parse body give access for req.body
app.use(express.json()); // Parse JSON bodies


mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('connected to database!');
})
.catch(() => {
    console.log('error cannot connect to database');
})

//routes
app.use('/users', userRoute);
app.use('/cart', cartRoute);
app.use('/order', orderRoute);
//link to enter the shop
/*
app.get('/', (req,res)=>{
    res.render('test');
});*/

//listen 
/*
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});*/

module.exports = app;



