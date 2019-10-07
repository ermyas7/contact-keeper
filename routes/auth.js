const express = require('express');
const {check, validationResult} = require('express-validator');

const router = express.Router();

//@route POST api/auth
//@desc Login a user
//@access Private

router.post('/', (req, res) => {
    res.send('login user');
});

//@route GET api/auth
//@desc Auth user and get token
//@access Private

router.get('/', [
    check('username').isEmail(),
    check('password').isLength({
        min: 5
    })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errrors: errors.array()
        })
    }
    res.send('Auth user and get token');
});

module.exports = router;