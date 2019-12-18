const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateRegisterInput(data){
    const errors= {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

   
   
    if(!Validator.isLength(data.name,{min:2,max:30})){
        errors.name='Name Must be between 2 and 30 characters'
    }
    if (Validator.isEmpty(data.name)){
        errors.name = 'Name cannot be empty'
    }

    
    if(!Validator.isEmail(data.email)){
        errors.email='Invalid email ID'
    }
    if (Validator.isEmpty(data.email)){
        errors.email = 'Email cannot be empty'
    }


    if(!Validator.isLength(data.password,{min: 6,max:30})){
        errors.password='Password Must be between 6 and 30 characters'
    }
    if (Validator.isEmpty(data.password)){
        errors.password = 'Password cannot be empty'
    }

    if (Validator.isEmpty(data.password2)){
        errors.password2 = 'Confirm Password Field is required'
    }
    if(!Validator.equals(data.password, data.password2)){
        errors.password2 = 'Passwords must be same'
    }


    return {
        errors: errors,
        isValid: isEmpty(errors) 
    };
}; 