const express = require('express');
const mongoose = require('mongoose');
const bycrpt = require('bcrypt');
const session = require('express-session');
const MongoDBStore = require("connect-mongodb-session")(session);
const User = require('../models/config');
const userRoute = require('../routes/userRoutes');

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


app.post('/addToCart', (req, res) => {
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
    res.send('Item added to cart successfully');
});

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