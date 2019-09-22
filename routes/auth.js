const express = require('express');

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

router.get('/', (req, res) => {
    res.send('Auth user and get token');
});

module.exports = router;