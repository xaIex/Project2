const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cartRoutes = require('./cartRoutes');

const app = express();
const port = 3000;

// Set up MongoDB session store
const store = new MongoDBStore({
    uri: 'mongodb+srv://xcastillo2001:Sq5lBuispIryiMpf@project2.qadwpbn.mongodb.net/usersandorders',
    collection: 'sessions'
});

app.use(session({
    secret: 'SECRET',
    saveUninitialized: false,
    resave: false,
    store: store,
    cookie: {
        maxAge: 60000 * 60 * 24 // Max age of cookie set to 24 hours
    }
}));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

// Import cartRoutes and use it for cart-related routes
app.use('/', cartRoutes);

// Other routes and server setup
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
