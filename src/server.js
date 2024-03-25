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


mongoose.connect('mongodb+srv://xcastillo2001:Sq5lBuispIryiMpf@project2.qadwpbn.mongodb.net/usersandorders?retryWrites=true&w=majority&appName=project2')
.then(() => {
    console.log('connected to database!');
})
.catch(() => {
    console.log('error cannot connect to database');
})

app.use('/users', userRoute);

app.get('/',(req,res) => {
    res.render('home.ejs')
});

app.get('/createAccount', (req,res) => {
    res.render('createAccount.ejs');
});

app.get('/account',(req,res) => {
    res.render('account.ejs')
});
app.get('/test', isAuth, (req,res) => {
    res.render('test.ejs');
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

app.post('/logout', (req,res) => {
    req.session.destroy((err) => {
        if(err) throw err;
        res.redirect('/createAccount');
    })
})
app.listen(3000, () => {
    console.log("running on port 3000");
});

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