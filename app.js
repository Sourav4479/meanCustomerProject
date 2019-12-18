const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');


const users = require('./routes/api/users');
const customers = require('./routes/api/customer');

//const profile = require('./routes/api/profile');
//const posts = require('./routes/api/posts');

const app = express();
//Body Parser 
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



//DB Config

const db = require('./config/keys').mongoURI;

//DB Connect

mongoose
    .connect(db,{useNewUrlParser : true,useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err+""));



app.get('/', (req,res)=> res.send('Hello'));


//Middleware passport  
app.use(passport.initialize());
//passport config
require('./config/passport')(passport);


//Use Route

app.use('/api/users', users);
app.use('/api/customers', customers);
//app.use('/api/profile',profile); 
//app.use('/api/posts', posts)


const port = process.env.PORT || 80;

app.listen(port,()=> console.log(`Server is running on port ${port}`));