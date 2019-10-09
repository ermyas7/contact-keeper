const express = require('express');
const {check, validationResult} = require('express-validator');

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
        res.json(contacts);
    }catch(err){
        console.error(err.message);
        res.send('Server Error');
    }
});

//@route POST api/contacts
//@desc Add new contact
//@access Private

router.post('/',[auth,
    check('name', 'Name is required').not().isEmpty()
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {name, email, type, phone} = req.body;
    try{
        const newContact = new Contact({
            name,
            email,
            type,
            phone,
            user: req.user.id
        });

        const contact = await newContact.save();
        res.json(contact);

    }catch(err){
        console.error(err.message);
        res.send('Server Error');  
    }
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