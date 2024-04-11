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
            res.redirect("/account");
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
        return res.redirect('/account');
    }

    const isMatch = await bycrpt.compare(pswd, existingUser.password);    

    if(!isMatch){
        return res.redirect('/account');
    }
    req.session.isAuth = true;
    res.redirect('/home')
};

module.exports = {
    registerAccount,
    loginAccount
}