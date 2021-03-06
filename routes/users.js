const express = require('express');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');

const router = express.Router();

//@route POST api/users
//@desc Register a user
//@access Public

router.post('/', [
    check('name', 'Please add name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({min: 5})
],async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {name, email, password} = req.body;

    try{
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                msg: 'User already exists'
            })
        };

        user = new User({
            name,
            email,
            password
        });

        //generate salt
        const salt = await bcrypt.genSalt(10);
        //encript user password with salt
        user.password = await bcrypt.hash(password, salt);
        //save user
        await user.save();

        //jwt payload
        const payload = {
            user: {
                id: user.id
            }
        };

        //generate jws signiture
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 3600
        }, (err, token) => {
            if(err) throw err;
            res.json({token});
        })

    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;