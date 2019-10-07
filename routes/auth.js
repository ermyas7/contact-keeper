const express = require('express');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const router = express.Router();

//@route POST api/auth
//@desc Auth user and get token
//@access Public

router.post('/',[
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ] ,async (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        });
    };

    const {email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg: 'Invalid credentails'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({msg: 'Invalid credentails'});
        }

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
        res.status(500).send('Server error');
    }
});

//@route GET api/auth
//@desc get auth user
//@access Private

router.get('/' ,(req, res) => {
    
    res.send('Auth user and get token');
});

module.exports = router;