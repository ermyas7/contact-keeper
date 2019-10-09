const express = require('express');

const Contact = require('../models/Contact');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

//@route GET api/contacts
//@desc GET all users contact
//@access Private

router.get('/',auth, async (req, res) => {
    try{
        const contacts = await Contact.find({user: req.user.id}).sort({data: -1});
        res.send(contacts);
    }catch(err){
        console.error(err.message);
        res.send('Server Error');
    }
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