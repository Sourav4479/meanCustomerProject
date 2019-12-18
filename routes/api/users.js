//Only to be used for authentication of users
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');

//import for authentication purpose
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
//require('../../config/passport')(passport);
//Load Input Validator

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//Load User model 
const User = require('../../models/User');


// @route GET api/users/test
// @desc  test users routes
// @acess Public


router.get('/test', (req, res) => res.json({ msg: 'It Works....' }));

/*******************************************************************************************/
// @route GET  api/users/register
// @desc  Register users
// @acess Public
/***************************/
//@Request Body Payload
//  name:string
//  email:string
//  password:string
//  password2:string
/***************************/
//@Response Payload
//  register user details
//  
//    "_id": "5df7e298d3d8c124a0d2eb63",
//    "name": "Dummy",
//    "email": "dummy@gmail.com",
//    "avatar": "//www.gravatar.com/avatar/d997020ebc85538140cc01d69c6127a5?s=200&r=pg&d=mm",
//    "password": "$2a$10$HF3EJtjD7Ctf1576MWlSsOCYwZi3zLQzoAP3kQiVHySN3L2h8U7iW",
//    "__v": 0
//

router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    
    
    //Check Validation 
    if(!isValid){
        return res.status(400).json(errors)
    }


    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                errors.email= 'Email already exists';
                return res.status(400).json(errors);
            }
            else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200',//Size
                    r: 'pg',//rating
                    d: 'mm' //default
                });

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar: avatar,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) { console.log(err); }
                        else {
                            newUser.password = hash;
                            newUser.save()
                                .then(user => res.json(user))//.save() is a mongoose function which gives/return/promise the user which is created  
                                .catch(err => console.log(err));
                        }
                    })
                })


            }
        });
});

/***********************************************************************************************/

// @route GET api/users/login
// @desc  Login users / Returning Json Web token or JWT
// @acess Public

router.post('/login', (req, res) => {
    
    const { errors, isValid } = validateLoginInput(req.body);
    
    
    //Check Validation 
    if(!isValid){
        return res.status(400).json(errors)
    }
    
    
    const email = req.body.email;
    const password = req.body.password;



    //Find user by email
    User.findOne({ email })
        .then(user => {
            if (!user) {
                errors.email = 'User/Email not Found';
                return res.status(404).json(errors);
            }
            //Check password

            bcrypt.compare(password, user.password) //fetch password from user in line 71
                .then(isMatch => {
                    if(!isMatch)
                    {   
                        errors.password = 'Incorrect password'; 
                        return res.status(400).json(errors);
                    }
                    else{
                    /*  res.json({msg:'Success...'}); */
                        //User Matched

                        const payload ={ id:user.id, name:user.name, avatar: user.avatar }; //Create Jwt Payload


                        //Sign Token
                        jwt.sign(payload,keys.secretOrKey,{ expiresIn : 3600 },(err,token)=>{
                            res.json({
                              success: true,
                              token: 'Bearer '+ token  
                            })
                        });

                    }
                })


        })
});

// @route GET api/users/current
// @desc  Returning current user
// @acess Private


router.get('/current',passport.authenticate('jwt',{ session:false }),(req,res) =>{
     //res.json({ msg :'Success'}); 

    res.json({
        id:req.user.id,
        name:req.user.name,
        email:req.user.email 
    });  
});


//router.get('/current',(req,res)=>{
//    const reverseNum = (num)=>{
        //let originalNum=num.toString()
        //'-12300'
        
        
        //[...num.toString()].reverse().join('')
        
        //'00321-'
        
       // return parseFloat([...num.toString()].reverse().join('')) * Math.sign(num)
        //321
      
        /* newNum = newNum * Math.sign(num)  
        
        return newNum; */
        
     // }

      //res.json(reverseNum(12345))

//})

module.exports = router;