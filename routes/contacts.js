const express = require('express');

const Contact = require('../models/Contact');
const User = require('../models/User');
const router = express.Router();

//@route GET api/contacts
//@desc GET all users contact
//@access Private

router.get('/', (req, res) => {
    res.send('GET All users contact');
});

//@route POST api/contacts
//@desc Add new contact
//@access Private

router.post('/', (req, res) => {
    res.send('Add new contact');
});

//@route PUT api/contacts
//@desc Update a contact
//@access Private

router.put('/', (req, res) => {
    res.send('UPDATE contact');
});

//@route DELETE api/contacts
//@desc delete a contact
//@access Private

router.delete('/', (req, res) => {
    res.send('delete contact');
});

module.exports = router;