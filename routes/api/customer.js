const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const passport = require('passport');


const Customer = require('../../models/Customer');

const validateNewCustomerInput = require('../../validation/newCustomerInfo');


// @route GET api/customers/test
// @desc  test customers routes
// @acess Public

router.get('/test', (req, res) => res.json({
    msg: 'It Works....'
})); //Worked @16-12-2019:22:19

// @route POST api/customers/test
// @desc  Add customers routes
// @acess Private

router.post('/add', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    const {
        errors,
        isValid
    } = validateNewCustomerInput(req.body);
    if (!isValid) {
        console.log('Hello')
        return res.status(400).json(errors);
    }

    Customer.findOne({
            phoneNumber: req.body.phoneNumber
        })
        .then(customer => {
            if (customer) {
                errors.phoneNumber = "This Number is already registerd";
                return res.status(400).json(errors);
                
            } else {
                console.log('Hello');
                const addNewCustomer = new Customer({
                    addedById: req.user.id,
                    name: req.body.name,
                    gender: req.body.gender,
                    emailId : req.body.emailId,
                    phoneNumber: req.body.phoneNumber,
                    homeTown: req.body.homeTown, //name and avatar will be fetched from redux we dont need to add these field separately in the frontend
                });
                addNewCustomer.save()
                    .then(newCustomer =>{
                        res.json(newCustomer);
                    })
                    .catch(err =>{
                        console.log(err);
                    })

            }
        });


    //addNewCustomer.save().then(customer => res.json(customer));
});



// @route GET api/customers/list
// @desc  View all customers
// @acess Public


router.get('/list', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Customer.find()
        .sort({
            date: -1
        })
        .then(customers => res.json(customers))
        .catch(err => res.status(404).json({
            nopost: 'Ooops no customers found'
        }))
})




module.exports = router;
//If not added result in typeError
//"Router.use() requires a middleware function but got a Object"