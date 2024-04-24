const User = require('../models/config');
const bycrpt = require('bcrypt');

const registerAccount = async (req,res) =>{
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
            res.redirect("/account.html");
        }

    }catch (error){
        console.log('Error creating user:', error);
        res.status(500).send('Error creating user'); // Send error response to client
    }
};

const loginAccount = async (req,res) =>{
    const { email, pswd } = req.body;

    const existingUser = await User.findOne({email});
    if(!existingUser){
        return res.redirect('/account.html');
    }

    const isMatch = await bycrpt.compare(pswd, existingUser.password);    

    if(!isMatch){
        return res.redirect('/account.html');
    }
    req.session.isAuth = true;
    req.session.user = {
        id: existingUser._id, // underscore id because that is how it is called in the mongodb database
        email:existingUser.email,
        phone: existingUser.phone,
        address: existingUser.address,// note: after existingUser, the name is dependent of the registerAccount route, when we create a new User, since we named it address, we call it address
        zip: existingUser.zip,
        city: existingUser.city,
        state: existingUser.state,
        password: existingUser.password  // same with with password, we called it pswd intially in the html but we set it to password in the registerAccount 

    }
    res.redirect('/shop.html');
    
};

const logoutAccount = (req,res) => {
    req.session.destroy((err) => {
        if(err) throw err;
        res.redirect('/createAccount.html');
    });
};

module.exports = {
    registerAccount,
    loginAccount,
    logoutAccount
}