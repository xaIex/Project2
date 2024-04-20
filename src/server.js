const express = require('express');
const mongoose = require('mongoose');
const bycrpt = require('bcrypt');
const session = require('express-session');
const MongoDBStore = require("connect-mongodb-session")(session);
const User = require('../models/config');
const Order = require('../models/orderModel')
const userRoute = require('../routes/userRoutes');
const cartRoute = require('../routes/cartRoutes')

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
const isAuth = (req, res, next) => {
    if(req.session.isAuth){
        next()
    } else {
        res.redirect('/account');
    }
}
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

app.post('/remove-from-cart', (req, res) => {
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
});

app.post('/update-cart-quantity', (req, res) => {
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
});

app.get('/cart', (req, res) => {
    // Retrieve cart data from session
    const cart = req.session.cart || [];

    // Render cart.ejs and pass cart data to it
    res.render('cart', { cart });
});
  
app.post('/clearCart', (req, res) => {
    // Clear the cart data in the session
    req.session.cart = [];
    
    // Redirect the user back to the cart page or any other page you prefer
    res.redirect('/cart');
});

app.get('/',(req,res) => {
    res.render('home.ejs')
});

app.get('/createAccount', (req,res) => {
    res.render('createAccount.ejs');
});

app.get('/account',(req,res) => {
    res.render('account.ejs')
});
app.get('/home', isAuth, (req,res) => {
    res.render('home.ejs');
});

app.get('/product1Page',(req,res) => {
    res.render('productPage/product1Page.ejs');
});

app.get('/product2Page', (req,res) =>{
    res.render('productPage/product2Page.ejs');
});

app.get('/product3Page', (req,res) =>{
    res.render('productPage/product3Page.ejs');
});

app.get('/productCart', (req,res) => {
    const cart = req.session.cart || [];
    res.render('addProductCartPage.ejs', { cart, recentlyAddedItem });
});
/*
app.get('/orders',(req,res) => {
    try{
        const user = await User.
        res.render('orders.ejs');
    }catch(err){
        console.error(err);
    }
 
});*/
app.get('/profile', isAuth, (req,res) => {
    const user = req.session.user;
    res.render('profile', {user})
});

app.get('/orders', isAuth, (req,res) => {
    const user = req.session.user; // loginAccount in userController.js
    const cart = req.session.cart || [];
 
    console.log(user);
    res.render('orders.ejs', {user, cart});
});

app.get('/storeOrder', (req,res) => {
    const cart = req.session.cart || [];
    const userOrder = req.session.user;
    res.render('storeOrder.ejs', {cart, userOrder});
});

app.post('/submitOrder', async (req,res) => {
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
            productQuantity: item.quantity
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

    res.redirect('/storeOrder');
});

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



app.post('/logout', (req,res) => {
    req.session.destroy((err) => {
        if(err) throw err;
        res.redirect('/createAccount');
    })
})
app.listen(3000, () => {
    console.log("running on port 3000");
});


/*
app.post('/createAccount', async (req,res) => {
    try{
        const newUser = new User( { // document, create new instance of a user
            email: req.body.email,
            password: req.body.pswd,
            phone: req.body.phone,
            address: req.body.street,
            zip: req.body.zip,
            city: req.body.city,
            state: req.body.state
        });
        // server side validation
        if (!newUser.email || !newUser.password || !newUser.phone || !newUser.address || !newUser.zip || !newUser.city || !newUser.state) {
            return res.status(400).send("All fields are required");
        }

        // hash the password
        const hashPassword = await bycrpt.hash(newUser.password, 10);

        const existingUser = await User.findOne({email: newUser.email});
        if(existingUser){
            res.send('<script>alert("User already exists"); window.location="/createAccount";</script>');
           
        } else {
            //const userData = await User.insertMany(newUser);
            newUser.password = hashPassword;
            await newUser.save(); // save user to database
            console.log(newUser);
            res.redirect("/account");
        }

    }catch (error){
        console.log('Error creating user:', error);
        res.status(500).send('Error creating user'); // Send error response to client
    }
  
});*/
/*
app.post('/account', async (req,res) => {
    const { email, pswd } = req.body;

    const existingUser = await User.findOne({email});
    if(!existingUser){
        return res.redirect('/account');
    }

    const isMatch = await bycrpt.compare(pswd, existingUser.password);    

    if(!isMatch){
        return res.redirect('/account');
    }
    req.session.isAuth = true;
    res.redirect('/test')
});*/


  /*try {
        console.log('Form data:', req.body);

        const newUser = new User({
            email: req.body.email,
            password: req.body.pswd,
            phone: req.body.phone,
            address: req.body.street,
            zip: req.body.zip,
            city: req.body.city,
            state: req.body.state
        });

        const savedUser = await newUser.save();
        console.log('User created:', savedUser);
        res.send('User created successfully'); // Send response to client
    } catch (error) {
        console.log('Error creating user:', error);
        res.status(500).send('Error creating user'); // Send error response to client
    }*/