const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function (data){

    
    const errors= {};

    //data.text = !isEmpty(data.text) ? data.text : '';
  
  
    /* 
    if(!Validator.isLength(data.name, {min: 10, max: 300})){
        errors.text= ' character should be between 10 and 300';
    }
 */
    if (Validator.isEmpty(data.name)){
        errors.name = 'Name cannot be empty'
    }

    
    if (Validator.isEmpty(data.gender)){
        errors.gender = 'Gender cannot be left empty'
    }

    
    if (Validator.isEmpty(data.emailId)){
        errors.emailId = 'Email field cannot be empty'
    }

    
    if (Validator.isEmpty(data.homeTown)){
        errors.homeTown = 'HomeTown field cannot be empty'
    }

    if(!Validator.isEmail(data.emailId)){
        errors.emailId = "Invalid Email Id";
    }
    if(!Validator.isLength(data.phoneNumber, {min:10,max:10})){
        errors.phoneNumber ="Not a valid phone number";
    }
    /* console.log(isEmpty(errors)); */
   
    return {
        errors: errors,
        isValid: isEmpty(errors) 
    };
}; 