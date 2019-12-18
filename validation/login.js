const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateLoginInput(data){
    const errors= {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
  
    
    if(!Validator.isEmail(data.email)){
        errors.email='Invalid email ID'
    }
    if (Validator.isEmpty(data.email)){
        errors.name = 'Email cannot be empty'
    }


  
    if (Validator.isEmpty(data.password)){
        errors.password = 'Password cannot be empty'
    }

  

    return {
        errors: errors,
        isValid: isEmpty(errors) 
    };
}; 