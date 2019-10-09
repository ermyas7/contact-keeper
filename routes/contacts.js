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
});

//@route PUT api/contacts
//@desc Update a contact
//@access Private

router.put('/:id',auth, async (req, res) => {
    //build contact object
    const contactField = {};
    const {name, email, phone, type} = req.body;
    if(name) contactField.name = name;
    if(email) contactField.email = email;
    if(phone) contactField.phone = phone;
    if(type) contactField.type = type;

    try{
        let contact = await Contact.findById(req.params.id);
        if(!contact){
            res.status(404).json({msg: 'Contact not found'});
        }

        //make sure user owns the contact
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'Not authorized'});
        }

        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            {$set: contactField},
            {new: true}
        );
        res.json(updatedContact);
    }catch(err){
        console.error(err.message);
        res.send('Server Error');  
    }

});

//@route DELETE api/contacts
//@desc delete a contact
//@access Private

router.delete('/:id',auth, async (req, res) => {
    try{
        let contact = await Contact.findById(req.params.id);
        if(!contact){
            res.status(404).json({msg: 'Contact not found'});
        }

        //make sure user owns the contact
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'Not authorized'});
        }

        await Contact.findByIdAndRemove(req.params.id);
        res.send('contact deleted!');
    }catch(err){
        console.error(err.message);
        res.send('Server Error');  
    }
});

module.exports = router;